package in.varnum.app;

import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.OpenableColumns;
import android.util.Base64;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

/**
 * Hands files opened with Varnum ("Open with" or "Share" from WPS, a file manager, WhatsApp, ChatGPT…)
 * to the web app as a "fileOpened" event: { name, mime, data (base64) }.
 * The event is kept until the page adds its listener, so a file that starts the app is not lost.
 */
@CapacitorPlugin(name = "OpenedFile")
public class OpenedFilePlugin extends Plugin {
    private static final int MAX_BYTES = 20 * 1024 * 1024;

    @Override
    public void load() {
        Intent intent = getActivity().getIntent();
        if (handle(intent)) getActivity().setIntent(new Intent(Intent.ACTION_MAIN));
    }

    @Override
    protected void handleOnNewIntent(Intent intent) {
        super.handleOnNewIntent(intent);
        handle(intent);
    }

    @SuppressWarnings("deprecation")
    private boolean handle(Intent intent) {
        if (intent == null) return false;
        Uri uri = null;
        if (Intent.ACTION_VIEW.equals(intent.getAction())) uri = intent.getData();
        else if (Intent.ACTION_SEND.equals(intent.getAction())) uri = intent.getParcelableExtra(Intent.EXTRA_STREAM);
        if (uri == null) return false;
        final Uri u = uri;
        final String type = intent.getType();
        new Thread(() -> read(u, type)).start();
        return true;
    }

    private void read(Uri uri, String type) {
        JSObject ev = new JSObject();
        try (InputStream in = getContext().getContentResolver().openInputStream(uri)) {
            if (in == null) throw new Exception("no stream");
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buf = new byte[64 * 1024];
            int n, total = 0;
            while ((n = in.read(buf)) > 0) {
                total += n;
                if (total > MAX_BYTES) throw new Exception("too big");
                out.write(buf, 0, n);
            }
            String mime = getContext().getContentResolver().getType(uri);
            ev.put("name", displayName(uri));
            ev.put("mime", mime != null ? mime : type);
            ev.put("data", Base64.encodeToString(out.toByteArray(), Base64.NO_WRAP));
        } catch (Exception e) {
            ev.put("error", String.valueOf(e.getMessage()));
        }
        notifyListeners("fileOpened", ev, true);
    }

    private String displayName(Uri uri) {
        String name = null;
        if ("content".equals(uri.getScheme())) {
            try (Cursor c = getContext().getContentResolver().query(uri, new String[] { OpenableColumns.DISPLAY_NAME }, null, null, null)) {
                if (c != null && c.moveToFirst()) name = c.getString(0);
            } catch (Exception ignored) {
            }
        }
        if (name == null) name = uri.getLastPathSegment();
        return name != null ? name : "file";
    }
}
