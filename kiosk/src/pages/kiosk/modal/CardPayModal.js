import cardPayGif from '../../../img/ICInsert.gif';
import cardSound from '../../../voice/카드를 꽂아주세요.wav'
import {useEffect} from "react";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";

const CardPayModal = ({orderStatus, totalPrice, menuModalContentChange}) => {

    useEffect(() => {
        connectWebSocket();
        let audio = new Audio(cardSound);
        audio.play();
    }, []);

    let moneyStompClient;
    let sosoServerStatus;

    const connectWebSocket = async () => {//웹 소켓.

        moneyStompClient = Stomp.over(new SockJS('https://soso-kitchen.com/user/websocket'));
        sosoServerStatus = moneyStompClient.connected;

        moneyStompClient.connect({}, function (frame) {

            moneyStompClient.subscribe('/sendAdminMessage/kiosk/order', function (greeting) {
                var data = JSON.parse(greeting.body).message;

                if (data == "noStart") {
                    // voice("키오스크를 실행 시켜 주세요");
                    menuModalContentChange({
                        status: true,
                        param: '',
                        modalType: 'kioskTotalMessage',
                        modalTitle: '오류 메시지',
                        modalContent: '소소 페이지에서 키오스크를 실행 시켜 주세요.',
                        menu: ''
                    });
                } else if (data == "orderAfterNoStart") {
                    // voice("키오스크를 실행 시켜 주세요");
                    menuModalContentChange({
                        status: true,
                        param: '',
                        modalType: 'kioskTotalMessage',
                        modalTitle: '',
                        modalContent: '키오스크를 실행시켜주세요.',
                        menu: ''
                    });
                } else if (data == "error") {
                    menuModalContentChange({
                        status: true,
                        param: '',
                        modalType: 'kioskTotalMessage',
                        modalTitle: '오류 메시지',
                        modalContent: '데이터 저장 에러 (관리자에게 문의해주세요)',
                        menu: ''
                    });
                } else {
                    // menuModalContentChange({
                    //     status: true,
                    //     param: '',
                    //     modalType: 'orderSuccessAndGoMainPage',
                    //     modalTitle: '',
                    //     modalContent: '',
                    //     menu: ''
                    // });
                }
            });
        });

    }

    return (
        <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="card-gif">
                <img src={cardPayGif} alt={'카드 리더기 gif'}/>
            </div>
        </div>
    );
}
export default CardPayModal;