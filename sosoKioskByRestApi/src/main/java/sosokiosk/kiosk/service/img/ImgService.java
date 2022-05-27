package sosokiosk.kiosk.service.img;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import sosokiosk.kiosk.repository.menu.ImgRepository;
import sosokiosk.kiosk.subDto.MessageDTO;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class ImgService {

    @Autowired
    private ImgRepository imgRepository;

    //img 저장
    public Map<String, String> saveImg(MultipartFile menuImg, String status, MessageDTO messageDTO) {

        Map<String, String> result = new HashMap<>();

        String filePath;
        String fileName;
        String extension;

        if (menuImg != null) {
            if (menuImg.getOriginalFilename().equals("")) {
//            messageDTO.setStatus(true);
//            messageDTO.setMessageStatus("error");
//            messageDTO.setMessage("이미지의 이름을 추가해주세요.");
                return null;
            } else {

                fileName = StringUtils.cleanPath(menuImg.getOriginalFilename());

                // 현재 날짜 구하기
                Date now = new Date();
                SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
                String nowDate = format.format(now);

                filePath = "/kiosk/img/" + status;
                Path path = Paths.get(filePath);

                try {

                    if (!Files.exists(path)) {
                        Files.createDirectories(path);
                    }

                    extension = StringUtils.getFilenameExtension(filePath + "/" + fileName);

                    fileName = nowDate + "." + extension;

                    InputStream inputStream = menuImg.getInputStream();
                    Path pushFilePath = path.resolve(fileName);
                    Files.copy(inputStream, pushFilePath, StandardCopyOption.REPLACE_EXISTING);

                    result.put("imgName", fileName);
                    result.put("imgPath", filePath);
                    result.put("imgDate", nowDate);
                    result.put("imgExtension", extension);

                } catch (Exception e) {

                    messageDTO.setStatus(true);
                    messageDTO.setMessageStatus("error");
                    messageDTO.setMessage("알수없는 오류 : error - imgException");

                    return null;
                }

                return result;
            }
        } else {
            return null;
        }
    }
}
