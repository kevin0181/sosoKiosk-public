package sosokiosk.kiosk.kiosk.controller.setting;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import sosokiosk.kiosk.dto.setting.SettingDTO;
import sosokiosk.kiosk.service.setting.SettingService;

import javax.transaction.Transactional;
import java.util.List;

@Controller
public class KioskSettingController {

    @Autowired
    private SettingService settingService;

    @GetMapping("/kiosk/get/setting")
    @Transactional
    @ResponseBody
    public Object saveTax(@RequestParam("setting") String setting) {
        SettingDTO settingDTO;
        List<SettingDTO> settingDTOList = null;
        if (setting.equals("all")) {
            settingDTOList = settingService.getAllSetting();
            return settingDTOList;
        } else {
            settingDTO = settingService.getSettingByKiosk(setting);
            return settingDTO;
        }

    }

}
