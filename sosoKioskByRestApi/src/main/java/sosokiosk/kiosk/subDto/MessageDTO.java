package sosokiosk.kiosk.subDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDTO {
    private boolean status = false;
    private String messageStatus;
    private String message;
}
