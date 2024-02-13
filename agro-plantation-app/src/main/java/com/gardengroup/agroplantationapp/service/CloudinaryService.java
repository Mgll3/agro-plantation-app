package com.gardengroup.agroplantationapp.service;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.*;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryService {

    Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
        "cloud_name", "dvckhdihm",
        "api_key", "557386598599339",
        "api_secret", "bp3usRWRLm8otZenuA3dRYEWxMg",
        "secure", true));

    public Map upload(MultipartFile file, String folder) {
        try {
            Map result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder", folder));
            return result;
        } catch (Exception e) {
            throw new RuntimeException(e);
            
        }
    }

    public Map delete(String id) {
        try {
            Map result = cloudinary.uploader().destroy(id, ObjectUtils.emptyMap());
            return result;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
