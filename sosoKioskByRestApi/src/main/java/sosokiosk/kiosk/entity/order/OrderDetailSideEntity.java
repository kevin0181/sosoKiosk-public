package sosokiosk.kiosk.entity.order;

import lombok.Getter;
import lombok.Setter;
import sosokiosk.kiosk.entity.side.MenuSideEntity;

import javax.persistence.*;

@Getter
@Setter
@Entity(name = "order_detail_side")
public class OrderDetailSideEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderDetailSideSq;

    @Column(name = "side_sq")
    private Long sideSq;

    @Column(name = "order_detail_sq")
    private Long orderDetailSq;

    @Column(name = "order_side_name")
    private String orderSideName;

    @Column(name = "order_side_size")
    private int orderSideSize;

    @Column(name = "order_side_price")
    private String orderSidePrice;

    @OneToOne
    @JoinColumn(name = "side_sq", insertable = false, updatable = false)
    private MenuSideEntity menuSideEntity;

    @ManyToOne
    @JoinColumn(name = "order_detail_sq", insertable = false, updatable = false)
    private OrderDetailEntity orderDetailEntity;

}
