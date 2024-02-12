package com.androidproj.bridge;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.androidproj.R;
import com.facebook.react.ReactApplication;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Objects;

public class HomePageActivity extends AppCompatActivity {
    Button submit;
    EditText inputText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_home_page);
        submit= findViewById(R.id.submit);
        inputText = findViewById(R.id.inputText);
        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String text = inputText.getText().toString();
                if(text.length()>0)
                {
                    try {
                        Objects.requireNonNull(((ReactApplication) getApplicationContext()).getReactNativeHost().getReactInstanceManager().getCurrentReactContext())
                                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("goToReact", text);
                        finish();
                    } catch (Exception e) {
                        System.out.println(e);
                    }
                }

            }
        });
    }

}