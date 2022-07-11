package sosokiosk.kiosk.entity.order;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity(name = "order_menu")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long order_sq;

    @Column(name = "order_id") //200
    private String orderId;

    @Column(name = "order_total_price") //200
    private String orderTotalPrice;

    @Column(name = "order_date") //200
    private String orderDate;

    @Column(name = "order_date_time") //200
    private String orderDateTime;

    @Column(name = "order_place") //200
    private String orderPlace;

    @Column(name = "order_pay_status") //50
    private String orderPayStatus;

    @Column(name = "order_status") //50
    private boolean orderStatus;

    @Column(name = "order_telegramno") //12 // 전문일련번호
    private String orderTelegramNo;

    @Column(name = "order_tradetime") //6 //거래일시
    private String orderTradeTime;

    @Column(name = "order_approvalno") //12 //승인번호
    private String orderApprovalNo;

    @Column(name = "order_tradeuniqueno") //20 //거래고유번호
    private String orderTradeUniqueNo;

    @Column(name = "card_kind") //카드사 종류
    private String cardKind;

    @Column(name = "card_number") //카드 번호
    private String cardNumber;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_sq")
    private List<OrderDetailEntity> orderDetailEntityList = new ArrayList<>();

}
