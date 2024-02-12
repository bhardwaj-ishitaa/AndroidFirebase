package com.androidproj.bridge;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Objects;

public class CustomActionModules extends ReactContextBaseJavaModule {

    public CustomActionModules(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "CustomActionModules";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void goToHome() {
        Intent i = new Intent(getCurrentActivity(), HomePageActivity.class);
        getCurrentActivity().startActivity(i);
    }

}
