package levelBuilder.com;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.Base64;

import javax.imageio.ImageIO;
public class ImageSaver {
	
	
	
	public ImageSaver(){
		
	}
	
	public void saveBlobImageAsaFile(byte[] imageData, String filename) {
		
		ByteArrayInputStream bis = new ByteArrayInputStream(imageData);
		BufferedImage image;
		
		try {
			image = ImageIO.read(bis);
			String filenamepath = ".\\src\\main\\webapp\\tileset_src\\" + filename +".png"; // for windows
			File outputFile = new File(filenamepath);
			ImageIO.write(image, "png", outputFile);
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
