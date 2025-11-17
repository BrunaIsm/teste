$(function() {
    $('section#FAQ article').on('click', function() {
        $(this).find('div').slideToggle();
        $(this).find('header svg').toggleClass('rotated');
    });

    $('header nav#menu-mobile > div').on('click', function() {
        $(this).next('ul').slideToggle();
    });

    const messages = {
        basic: [
            "Oi! Seu pedido XXXXXXXX da loja {{store}} foi confirmado! Dentro de 7 dias, enviaremos seu código de rastreio por aqui!",
            "Oi! Seu pedido XXXXXXXX foi postado! Segue o código de rastreio: XXXXX123",
            "Oi! Seu pedido XXXXXXXX saiu para a entrega!",
            "Seu pedido XXXXXXXX foi entregue!"
        ],

        standard: {
            standard: [
                "Oi! Seu pedido XXXXXXXX da loja {{store}} foi confirmado! Dentro de 7 dias, enviaremos seu código de rastreio por aqui!",
                "Oi! Seu pedido XXXXXXXX foi postado! Segue o código de rastreio: XXXXX123",
                "Oi! Seu pedido XXXXXXXX saiu para a entrega!",
                "Seu pedido XXXXXXXX foi entregue!"
            ],

            formal: [
                "Olá, informamos que o pagamento do pedido XXXXXXXX, realizado na loja {{store}}, foi confirmado. \nSeu pedido está em processamento e, dentro de 7 dias, enviaremos o seu código de rastreamento.",
                "Olá, Fulano. Seu pedido foi postado e o código de rastreamento já está disponível: XXXXX123. \nAcompanhe pelo link abaixo: https://www.rastreieseupedidoaqui",
                "Olá! Informamos que o seu pedido XXXXX123 saiu para entrega. \nPor gentileza, aguarde a chegada nas próximas horas.",
                "Seu pedido XXXXX123 foi entregue. Agradecemos sua compra e esperamos que você goste!"
            ],

            informal: [
                "Oie! Aqui é da {{store}}, tô passando pra avisar que seu pedido (número do pedido) foi confirmado! Dentro de 7 dias vamos te enviar o código de rastreio por aqui!",
                "Oie! Aqui é da {{store}}. Viva! Seu pedido foi postado! Seu código de rastreio é: XXXXX123",
                "Uhul! Seu pedido XXXXXXXX saiu para a entrega!",
                "Oba! Seu pedido XXXXXXXX foi entregue!"
            ]
        },

        premium: {
            standard: [
                "Oi! Seu pedido XXXXXXXX da loja {{store}} foi confirmado! Dentro de 7 dias, enviaremos seu código de rastreio por aqui!",
                "Oi! Seu pedido XXXXXXXX foi postado! Segue o código de rastreio: XXXXX123",
                "Atualização: Seu pedido XXXXXXXX chegou ao centro logístico de Cidade/Estado!",
                "Boa notícia! Seu pedido XXXXXXXX saiu do centro logístico de Cidade/Estado e está a caminho!",
                "Oi! Seu pedido XXXXXXXX saiu para a entrega!",
                "Seu pedido XXXXXXXX foi entregue!"
            ],

            formal: [
                "Olá, informamos que o pagamento do pedido XXXXXXXX, realizado na loja {{store}}, foi confirmado. \nSeu pedido está em processamento e, dentro de 7 dias, enviaremos o seu código de rastreamento.",
                "Olá, Fulano. Seu pedido foi postado e o código de rastreamento já está disponível: XXXXX123. \nAcompanhe pelo link abaixo: https://www.rastreieseupedidoaqui",
                "Informamos que seu pedido XXXXXXXX chegou ao centro logístico de Cidade/Estado. Ele passará pelos próximos processos de encaminhamento.",
                "Seu pedido XXXXXXXX saiu do centro logístico de Cidade/Estado e está em transporte para a próxima etapa.",
                "Olá! Informamos que o seu pedido XXXXX123 saiu para entrega. Por gentileza, aguarde a chegada nas próximas horas.",
                "Seu pedido XXXXX123 foi entregue. Agradecemos sua compra e esperamos que você goste!"
            ],

            informal: [
                "Oie! Aqui é da {{store}}, tô passando pra avisar que seu pedido (número do pedido) foi confirmado! Dentro de 7 dias vamos te enviar o código de rastreio por aqui!",
                "Oie! Aqui é da {{store}}. Viva! Seu pedido foi postado! Seu código de rastreio é: XXXXX123",
                "Ebaa! Seu pedido XXXXXXXX chegou no centro logístico de Cidade/Estado!",
                "Uhuuul! Seu pedido XXXXXXXX acabou de sair do centro logístico de Cidade/Estado e já tá na estrada!",
                "Uhul! Seu pedido XXXXXXXX saiu para a entrega!",
                "Oba! Seu pedido XXXXXXXX foi entregue!"
            ]
        }
    };


    function formatMessage(text, store) {
        return text.replaceAll("{{store}}", store || "(nome da sua empresa)");
    }


    const $form = $('section#three article#whatsapp-simulator form');

    $form.on('change keyup input', function () {
        handleLanguageRules();
        attMessagesWhatsappSimulator(this);
    });

    handleLanguageRules();
    attMessagesWhatsappSimulator($form[0]);

    function handleLanguageRules() {
        const plan = $form.find('[name="demoPlan"]:checked').val();

        const $standard = $form.find('#standard');
        const $formal = $form.find('#formal');
        const $informal = $form.find('#informal');

        if (plan === "app-basic") {
            $standard.prop("checked", true);

            $formal.prop("disabled", true);
            $informal.prop("disabled", true);

        } else {
            $formal.prop("disabled", false);
            $informal.prop("disabled", false);
        }
    }

    function attMessagesWhatsappSimulator(form) {

        const store = $(form).find('#name').val().trim();
        const plan = $(form).find('[name="demoPlan"]:checked').val();
        const lang = $(form).find('[name="comunicationLanguage"]:checked').val();

        let list = [];

        if (plan === "app-basic") {
            list = messages.basic.map(msg => formatMessage(msg, store));
        }

        if (plan === "app-standard") {
            list = messages.standard[lang].map(msg => formatMessage(msg, store));
        }

        if (plan === "max-premium") {
            list = messages.premium[lang].map(msg => formatMessage(msg, store));
        }

        const container = $('.conversation-container');
        container.empty();

        list.forEach(text => {
            container.append(`
                <div class="message received">
                    ${text}
                </div>
            `);
        });
    }

});
