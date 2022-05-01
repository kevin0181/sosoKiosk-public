package sosokiosk.kiosk.service.setting;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sosokiosk.kiosk.dto.setting.SettingDTO;
import sosokiosk.kiosk.entity.setting.SettingEntity;
import sosokiosk.kiosk.repository.setting.SettingRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SettingService {

    @Autowired
    private SettingRepository settingRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<SettingDTO> getSetting() {

        List<SettingEntity> settingEntityList = settingRepository.findAll();
        List<SettingDTO> settingDTOList = settingEntityList.stream().map(settingEntity -> modelMapper.map(settingEntity, SettingDTO.class)).collect(Collectors.toList());

        if (settingDTOList.size() == 0) {  //만약 기본 설정 값이 없다면? 기본 설정값으로 설정

            SettingEntity settingEntity = new SettingEntity();//세금 추가
            settingEntity.setSettingName("tax");
            settingEntity.setSettingValue("10");

            settingEntityList.add(settingEntity);

            settingEntity = new SettingEntity(); //카드 리더기 test용 추가
            settingEntity.setSettingName("readerNo");
            settingEntity.setSettingValue("DPT0TEST03");

            settingEntityList.add(settingEntity);

            settingEntity = new SettingEntity(); //대표자 이름 추가
            settingEntity.setSettingName("leaderName");
            settingEntity.setSettingValue("");

            settingEntityList.add(settingEntity);


            settingEntity = new SettingEntity(); //사업자 번호 추가
            settingEntity.setSettingName("businessNumber");
            settingEntity.setSettingValue("");

            settingEntityList.add(settingEntity);


            settingEntity = new SettingEntity(); //프린터 추가
            settingEntity.setSettingName("printerName");
            settingEntity.setSettingValue("Printer1");

            settingEntityList.add(settingEntity);

            //--------------------

            settingRepository.saveAll(settingEntityList);

            settingEntityList = null;
            settingEntityList = settingRepository.findAll();
            settingDTOList = settingEntityList.stream().map(settingEntity1 -> modelMapper.map(settingEntity1, SettingDTO.class)).collect(Collectors.toList());

            return settingDTOList;

        }

        return settingDTOList;
    }

    public boolean saveTax(String tax) {

        List<SettingEntity> settingEntityList = settingRepository.findAll();
        if (settingEntityList.size() == 0) {
            return false;
        }

        for (int i = 0; i < settingEntityList.size(); i++) {
            if (settingEntityList.get(i).getSettingName().equals("tax")) {
                settingEntityList.get(i).setSettingValue(tax);
            }
        }

        return true;

    }

    public boolean saveReaderNo(String readerNo) {
        List<SettingEntity> settingEntityList = settingRepository.findAll();
        if (settingEntityList.size() == 0) {
            return false;
        }

        for (int i = 0; i < settingEntityList.size(); i++) {
            if (settingEntityList.get(i).getSettingName().equals("readerNo")) {
                settingEntityList.get(i).setSettingValue(readerNo);
            }
        }
        return true;
    }

    public boolean saveLeaderName(String leaderName) {

        List<SettingEntity> settingEntityList = settingRepository.findAll();
        if (settingEntityList.size() == 0) {
            return false;
        }

        for (int i = 0; i < settingEntityList.size(); i++) {
            if (settingEntityList.get(i).getSettingName().equals("leaderName")) {
                settingEntityList.get(i).setSettingValue(leaderName);
            }
        }
        return true;

    }

    public boolean saveBusinessNumber(String businessNumber) {
        List<SettingEntity> settingEntityList = settingRepository.findAll();
        if (settingEntityList.size() == 0) {
            return false;
        }

        for (int i = 0; i < settingEntityList.size(); i++) {
            if (settingEntityList.get(i).getSettingName().equals("businessNumber")) {
                settingEntityList.get(i).setSettingValue(businessNumber);
            }
        }
        return true;
    }

    public boolean savePrinterName(String printerName) {
        List<SettingEntity> settingEntityList = settingRepository.findAll();
        if (settingEntityList.size() == 0) {
            return false;
        }

        for (int i = 0; i < settingEntityList.size(); i++) {
            if (settingEntityList.get(i).getSettingName().equals("printerName")) {
                settingEntityList.get(i).setSettingValue(printerName);
            }
        }
        return true;
    }


    public SettingDTO getSettingByKiosk(String setting) {
        SettingEntity settingEntity = settingRepository.findBySettingName(setting);
        SettingDTO settingDTO = modelMapper.map(settingEntity, SettingDTO.class);
        return settingDTO;
    }

    public List<SettingDTO> getAllSetting() {
        List<SettingEntity> settingEntityList = settingRepository.findAll();
        List<SettingDTO> settingDTOList = settingEntityList.stream().map(settingEntity -> modelMapper.map(settingEntity, SettingDTO.class)).collect(Collectors.toList());
        return settingDTOList;
    }


}
