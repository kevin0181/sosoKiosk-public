package sosokiosk.kiosk.subDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderSide {
    private Long sideSq;
    private String sidePrice;
    private int sideSize;
    private String sideName;
}
