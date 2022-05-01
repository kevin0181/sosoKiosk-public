package sosokiosk.kiosk.config;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class Bean {

    @org.springframework.context.annotation.Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }



}
