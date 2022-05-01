package sosokiosk.kiosk.entity.order;

import lombok.Getter;
import lombok.Setter;
import sosokiosk.kiosk.entity.menu.MenuEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity(name = "order_detail")
public class OrderDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderDetailSq;

    @Column(name = "order_sq")
    private Long orderSq;

    @Column(name = "menu_sq")
    private Long menuSq;
    
    @Column(name = "order_menu_name")
    private String orderMenuName;

    @Column(name = "order_detail_menu_size")
    private int orderDetailMenuSize;

    @Column(name = "order_detail_menu_price")
    private String orderDetailMenuPrice;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_detail_sq")
    private List<OrderDetailSideEntity> orderDetailSideEntityList = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "menu_sq", insertable = false, updatable = false)
    private MenuEntity menuEntity;

    @ManyToOne
    @JoinColumn(name = "order_sq", insertable = false, updatable = false)
    private OrderEntity orderDTO;
}
