import Vonage from '@vonage/server-sdk';

const vonage = new Vonage({
  apiKey: "310a7070",
  apiSecret: "zU8MxS5zOrCki16c"
})



export const SendSms = () => {
    const from = "Vonage APIs"
    const to = "8801308663002"
    const text = 'Welcome to our Instagram'

    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}