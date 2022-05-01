package sosokiosk.kiosk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import sosokiosk.kiosk.admin.controller.sales.SalesController;

import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootApplication
public class KioskApplication {

    public static void main(String[] args) {
        SpringApplication.run(KioskApplication.class, args);
        SalesController.nowDateFormat(); // 키오스크 시작 시간
    }

}
