// import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./TossPayments.css";

// // TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
// // TODO: server.js 의 secretKey 또한 결제위젯 연동 키가 아닌 API 개별 연동 키의 시크릿 키로 변경해야 합니다.
// // TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
// // @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
// const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
// const customerKey = generateRandomString();

// export default function WidgetCheckoutPage() {
//   const navigate = useNavigate();

//   const [amount, setAmount] = useState({
//     currency: "KRW",
//     value: 50000,
//   });
//   const [ready, setReady] = useState(false);
//   const [widgets, setWidgets] = useState(null);

//   useEffect(() => {
//     async function fetchPaymentWidgets() {
//       try {
//         const tossPayments = await loadTossPayments(clientKey);

//         // 회원 결제
//         // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentswidgets
//         const widgets = tossPayments.widgets({
//           customerKey,
//         });
//         // 비회원 결제
//         // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

//         setWidgets(widgets);
//       } catch (error) {
//         console.error("Error fetching payment widget:", error);
//       }
//     }

//     fetchPaymentWidgets();
//   }, [clientKey, customerKey]);

//   useEffect(() => {
//     async function renderPaymentWidgets() {
//       if (widgets == null) {
//         return;
//       }

//       // ------  주문서의 결제 금액 설정 ------
//       // TODO: 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
//       // TODO: renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
//       // @docs https://docs.tosspayments.com/sdk/v2/js#widgetssetamount
//       await widgets.setAmount(amount);

//       await Promise.all([
//         // ------  결제 UI 렌더링 ------
//         // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderpaymentmethods
//         widgets.renderPaymentMethods({
//           selector: "#payment-method",
//           // 렌더링하고 싶은 결제 UI의 variantKey
//           // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
//           // @docs https://docs.tosspayments.com/guides/v2/payment-widget/admin#새로운-결제-ui-추가하기
//           variantKey: "DEFAULT",
//         }),
//         // ------  이용약관 UI 렌더링 ------
//         // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderagreement
//         widgets.renderAgreement({
//           selector: "#agreement",
//           variantKey: "AGREEMENT",
//         }),
//       ]);

//       setReady(true);
//     }

//     renderPaymentWidgets();
//   }, [widgets]);

//   return (
//     <div className="wrapper">
//       <div className="box_section">
//         {/* 결제 UI */}
//         <div id="payment-method" />
//         {/* 이용약관 UI */}
//         <div id="agreement" />
//         {/* 쿠폰 체크박스 */}
//         <div style={{ paddingLeft: "30px" }}>
//           <div className="checkable typography--p">
//             <label htmlFor="coupon-box" className="checkable__label typography--regular">
//               <input
//                 id="coupon-box"
//                 className="checkable__input"
//                 type="checkbox"
//                 aria-checked="true"
//                 disabled={!ready}
//                 // ------  주문서의 결제 금액이 변경되었을 경우 결제 금액 업데이트 ------
//                 // @docs https://docs.tosspayments.com/sdk/v2/js#widgetssetamount
//                 onChange={async (event) => {
//                   if (event.target.checked) {
//                     await widgets.setAmount({
//                       currency: amount.currency,
//                       value: amount.value - 5000,
//                     });

//                     return;
//                   }

//                   await widgets.setAmount({
//                     currency: amount.currency,
//                     value: amount.value,
//                   });
//                 }}
//               />
//               <span className="checkable__label-text">7,000원 쿠폰 적용</span>
//             </label>
//           </div>
//         </div>

//         {/* 결제하기 버튼 */}
//         <button
//           className="button"
//           style={{ marginTop: "30px" }}
//           disabled={!ready}
//           // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
//           // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrequestpayment
//           onClick={async () => {
//             try {
//               // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
//               // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
//               await widgets.requestPayment({
//                 orderId: generateRandomString(), // 고유 주문 번호
//                 orderName: "토스 티셔츠 외 2건",
//                 successUrl: window.location.origin + "/widget/success", // 결제 요청이 성공하면 리다이렉트되는 URL
//                 failUrl: window.location.origin + "/fail", // 결제 요청이 실패하면 리다이렉트되는 URL
//                 customerEmail: "customer123@gmail.com",
//                 customerName: "김토스",
//                 // 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되는 값입니다. 필요하다면 주석을 해제해 주세요.
//                 // customerMobilePhone: "01012341234",
//               });
//             } catch (error) {
//               // 에러 처리하기
//               console.error(error);
//             }
//           }}
//         >
//           결제하기
//         </button>
//       </div>
//     </div>
//   );
// }

// function generateRandomString() {
//   return window.btoa(Math.random().toString()).slice(0, 20);
// }

//mui based style
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
} from "@mui/material";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = generateRandomString();

export default function WidgetCheckoutPage() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 50000,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);
  const [useCoupon, setUseCoupon] = useState(false);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const widgets = tossPayments.widgets({ customerKey });
        setWidgets(widgets);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    }

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets) return;

      await widgets.setAmount(amount);

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  const handleCouponToggle = async (event) => {
    const checked = event.target.checked;
    setUseCoupon(checked);

    await widgets.setAmount({
      currency: amount.currency,
      value: checked ? amount.value - 5000 : amount.value,
    });
  };

  const handlePayment = async () => {
    try {
      await widgets.requestPayment({
        orderId: generateRandomString(),
        orderName: "토스 티셔츠 외 2건",
        successUrl: window.location.origin + "/widget/success",
        failUrl: window.location.origin + "/fail",
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundColor="#e8f3ff"
      flexDirection="column"
    >
      <Paper
        elevation={3}
        sx={{ p: 5, width: { xs: "90%", md: "500px" }, borderRadius: 8 }}
      >
        {/* 결제 UI */}
        <Box id="payment-method" mb={3} />
        {/* 약관 UI */}
        <Box id="agreement" mb={2} />
        {/* 쿠폰 체크박스 */}
        <FormControlLabel
          control={
            <Checkbox
              id="coupon-box"
              checked={useCoupon}
              onChange={handleCouponToggle}
              disabled={!ready}
              sx={{ mr: 1 }}
            />
          }
          label={
            <Typography variant="body2" fontFamily="Noto Sans KR">
              7,000원 쿠폰 적용
            </Typography>
          }
        />
        {/* 결제 버튼 */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 4,
            fontFamily: "Noto Sans KR",
            py: 1.5,
            fontSize: "1rem",
            backgroundColor: "#3182f6",
            borderRadius: 12,
          }}
          disabled={!ready}
          onClick={handlePayment}
        >
          결제하기
        </Button>
      </Paper>
      <Box mt={3} textAlign="center">
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Noto Sans KR",
            color: "primary.main",
            cursor: "pointer",
            textDecoration: "underline",
            "&:hover": { opacity: 0.8 },
          }}
          onClick={() => window.history.back()} // 뒤로가기 기능
        >
          뒤로 돌아가기
        </Typography>
      </Box>
    </Box>
  );
}

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}
