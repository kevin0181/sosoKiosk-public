package sosokiosk.kiosk.entity.side;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity(name = "side")
public class SideEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sideSq;

    @Column(name = "side_name") //200
    private String sideName;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "side_sq")
    private List<SideCategoryEntity> sideCategoryDTOList = new ArrayList<>();

}
