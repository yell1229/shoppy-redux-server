import axios from 'axios';
import * as repository from '../repository/orderRepository.js';


export const payment = async(req, res) => {

    try {
        console.log(req.body);
        const {id, item_name, total_amount} = req.body;
        const KAKAO_ADMIN_KEY = "8ccc326bd3020a9c8d60b26794991220";
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        const response = await axios.post(
            "https://kapi.kakao.com/v1/payment/ready",
            {
                cid: "TC0ONETIME", // 테스트용 CID : TC0ONETIME
                partner_order_id: `order_${uniqueSuffix}`,
                partner_user_id: id,
                item_name,
                quantity: 1,
                total_amount,
                tax_free_amount: 0,
                approval_url: "http://shoppy-redux-reacts.s3-website.ap-northeast-2.amazonaws.com/payment/success",
                cancel_url: "http://shoppy-redux-reacts.s3-website.ap-northeast-2.amazonaws.com/payment/cancel",
                fail_url: "http://shoppy-redux-reacts.s3-website.ap-northeast-2.amazonaws.com/payment/fail",
            },
            {
                headers: {
                    Authorization: `KakaoAK ${KAKAO_ADMIN_KEY}`,
                    "Content-Type": "application/x-www-form-urlencoded",
            },
            }
        );

        res.json(response.data);

    } catch (error) {
    console.error("QR 결제 요청 실패:", error);
    res.status(500).json(error.response.data);
    }


}