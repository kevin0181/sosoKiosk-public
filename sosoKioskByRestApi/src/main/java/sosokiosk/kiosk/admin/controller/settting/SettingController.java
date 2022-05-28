package sosokiosk.kiosk.admin.controller.settting;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import sosokiosk.kiosk.dto.setting.SettingDTO;
import sosokiosk.kiosk.service.setting.SettingService;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class SettingController {

    @Autowired
    private SettingService settingService;

    @Transactional
    @ResponseBody
    @GetMapping("/admin/v1/setting")
    public Map<String, String> adminSettingV1(@RequestParam("status") String status) {
        Map<String, String> settingMap = new HashMap<>();
        List<SettingDTO> settingDTOList = settingService.getSetting();
        for (int i = 0; i < settingDTOList.size(); i++) {
            settingMap.put(settingDTOList.get(i).getSettingName(), settingDTOList.get(i).getSettingValue());
        }
        return settingMap;
    }

    @GetMapping("/admin/save/setting/tax")
    @Transactional
    @ResponseBody
    public boolean saveTax(@RequestParam("tax") String tax) {

        try {

            if (tax == null || tax.equals("")) {
                return false;
            }

            boolean isNumeric = tax.matches("[+-]?\\d*(\\.\\d+)?");
            if (isNumeric) {
                return settingService.saveTax(tax);
            } else {
                return false;
            }

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }

    }

    @GetMapping("/admin/save/setting/readerNo")
    @Transactional
    @ResponseBody
    public boolean saveReaderNo(@RequestParam("readerNo") String readerNo) {

        try {

            if (readerNo == null || readerNo.equals("")) {
                return false;
            }

            return settingService.saveReaderNo(readerNo);

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }

    }


    @GetMapping("/admin/save/setting/leaderName")
    @Transactional
    @ResponseBody
    public boolean saveLeaderName(@RequestParam("leaderName") String leaderName) {

        try {

            if (leaderName == null) {
                return false;
            }

            return settingService.saveLeaderName(leaderName);

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }

    }


    @GetMapping("/admin/save/setting/businessNumber")
    @Transactional
    @ResponseBody
    public boolean saveBusinessNumber(@RequestParam("businessNumber") String businessNumber) {

        try {

            if (businessNumber == null) {
                return false;
            }

            return settingService.saveBusinessNumber(businessNumber);

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }

    }


    @GetMapping("/admin/save/setting/printerName")
    @Transactional
    @ResponseBody
    public boolean savePrinterName(@RequestParam("printerName") String printerName) {

        try {

            if (printerName == null || printerName.equals("")) {
                return false;
            }

            return settingService.savePrinterName(printerName);

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }

    }
}
