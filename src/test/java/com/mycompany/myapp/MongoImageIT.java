package com.mycompany.myapp;

import com.mongodb.*;
import com.mongodb.gridfs.*;
import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class MongoImageIT {

//    @Test
    void testLoadAll(){
        Mongo mongo = new Mongo("localhost", 27017);
        DB db = mongo.getDB("imagedb");

        GridFS gfsPhoto = new GridFS(db, "photo");
        DBCursor cursor = gfsPhoto.getFileList();
        while (cursor.hasNext()) {
            System.out.println(cursor.next());
        }
    }

//    @Test
    void testSaveInDockerMongo() throws IOException {

        Mongo mongo = new Mongo("localhost", 27017);
        DB db = mongo.getDB("imagedb");
        DBCollection collection = db.getCollection("dummyColl");

        String newFileName = "architecture";

        File imageFile = new File("/tmp/Architecture.jpeg");

        // create a "photo" namespace
        GridFS gfsPhoto = new GridFS(db, "photo");

        // get image file from local drive
        GridFSInputFile gfsFile = gfsPhoto.createFile(imageFile);

        // set a new filename for identify purpose
        gfsFile.setFilename(newFileName);

        // save the image file into mongoDB
        gfsFile.save();

//        // print the result
//        DBCursor cursor = gfsPhoto.getFileList();
//        while (cursor.hasNext()) {
//            System.out.println(cursor.next());
//        }
//
//        // get image file by it's filename
//        GridFSDBFile imageForOutput = gfsPhoto.findOne(newFileName);
//
//        // save it into a new image file
//        imageForOutput.writeTo("c:\\JavaWebHostingNew.png");
//
//        // remove the image file from mongoDB
//        gfsPhoto.remove(gfsPhoto.findOne(newFileName));
//
        System.out.println("Done");
    }
}
