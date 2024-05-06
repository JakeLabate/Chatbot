class Chatbot {
    constructor(chatbot) {

        // the chatbot configuration object
        this.chatbot = chatbot;

        // openai stuff -> for easy access across the class
        this.assistant_id = null;
        this.thread_id = null;
        this.apiKey = chatbot.apiKey;

        // visibility statuses (either 'visible' or 'hidden')
        // this is referenced and updated when users interact with the chatbot components
        this.status = {
            icon: 'hidden',
            notice: 'hidden',
            widget: 'hidden',
        }

    }
    async init() {
        this.iconBuild();
        this.noticeBuild();
        // the actual widget ('this.widgetBuild()') is built the first time the user clicks the 'icon' or 'notice', saving resources
    }

    // icon
    iconBuild() {
        console.log('iconBuild');

        const existingIcon = document.getElementById('hooray-chatbot-icon');
        existingIcon?.remove();

        const icon = document.createElement('div');
        icon.id = 'hooray-chatbot-icon';

        icon.style.backgroundColor = this.chatbot.branding.colors.primaryDark;
        icon.style.height = '50px';
        icon.style.width = '50px';
        icon.style.borderRadius = '50%';
        icon.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        icon.style.transition = 'all 0.15s ease';
        icon.style.cursor = 'pointer';
        icon.style.zIndex = '9999';
        icon.style.justifyContent = 'center';
        icon.style.alignItems = 'center';
        icon.style.position = 'fixed';
        icon.style.bottom = '15px';
        if (this.chatbot.settings.pageLocation === 'bottom-right') {
            icon.style.right = '15px';
        } else if (this.chatbot.settings.pageLocation === 'bottom-left') {
            icon.style.left = '15px';
        } else {
            console.error('Invalid page location');
        }

        // build icon
        const image = document.createElement('img');
        image.src = this.chatbot.branding.iconSrc;
        image.style.borderRadius = '50%';
        image.style.paddingTop = '5px';
        image.style.paddingLeft = '5px';
        image.style.height = '40px';
        image.style.width = '40px';

        // add event listeners
        icon.addEventListener('mouseover', () => { this.iconHover(); });
        icon.addEventListener('mouseout', () => { this.iconUnhover(); });
        icon.addEventListener('click', () => { this.iconClick(); });

        // attach
        icon.appendChild(image);
        document.body.appendChild(icon);

        this.status.icon = 'visible';
    }
    iconHover() {
        console.log('iconHover');

        const icon = document.getElementById('hooray-chatbot-icon');
        icon.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        icon.style.transform = 'scale(1.07)';
    }
    iconUnhover() {
        console.log('iconUnhover');

        const icon = document.getElementById('hooray-chatbot-icon');
        icon.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0)';
        icon.style.transform = 'scale(1)';
    }
    async iconClick() {
        console.log('iconClick');

        if (this.status.widget === 'visible') {
            this.widgetClose();
        } else if (this.status.widget === 'hidden') {
            this.widgetOpen();
        }
    }

    // notice
    noticeBuild() {
        console.log('noticeBuild');

        // delete any existing notice
        const existingNotice = document.getElementById('hooray-chatbot-notice');
        existingNotice?.remove();

        // create new notice
        const notice = document.createElement('div');
        notice.id = 'hooray-chatbot-notice';

        notice.style.fontFamily = this.chatbot.branding.fontFamily;
        notice.innerHTML = this.chatbot.settings.notice.text;
        notice.style.backgroundColor = this.chatbot.branding.colors.primaryDark;
        notice.style.color = this.chatbot.branding.colors.primaryLight;
        notice.style.padding = '10px';
        notice.style.borderRadius = '5px';
        notice.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        notice.style.transition = 'all 0.2s ease';
        notice.style.cursor = 'pointer';
        notice.style.zIndex = '9999';
        notice.style.position = 'fixed';
        notice.style.bottom = '75px';
        if (this.chatbot.settings.pageLocation === 'bottom-right') {
            notice.style.right = '15px';
        } else if (this.chatbot.settings.pageLocation === 'bottom-left') {
            notice.style.left = '15px';
        } else {
            console.error('Invalid page location');
        }

        // add event listeners
        notice.addEventListener('mouseover', () => { this.noticeHover(); });
        notice.addEventListener('mouseout', () => { this.noticeUnhover(); });
        notice.addEventListener('click', () => { this.noticeClick(); });

        document.body.appendChild(notice);

        this.status.notice = 'visible';

    }
    noticeHover() {
        console.log('noticeHover');

        const notice = document.getElementById('hooray-chatbot-notice');
        notice.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        notice.style.transform = 'scale(1.07)';
    }
    noticeUnhover() {
        console.log('noticeUnhover');

        const notice = document.getElementById('hooray-chatbot-notice');
        notice.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0)';
        notice.style.transform = 'scale(1)';
    }
    noticeClick() {
        console.log('noticeClick');

        console.log(this.status.widget)
        if (this.status.widget === 'visible') {
            this.widgetClose();
        } else if (this.status.widget === 'hidden') {
            this.widgetOpen();
        }

    }
    noticeOpen() {
        console.log('noticeOpen');

        const notice = document.getElementById('hooray-chatbot-notice');
        notice.style.display = 'block';

        this.status.notice = 'visible';
    }
    noticeClose() {
        console.log('noticeClose');

        const notice = document.getElementById('hooray-chatbot-notice');
        notice.style.display = 'none';

        this.status.notice = 'hidden';
    }

    // widget
    async widgetBuild() {
        console.log('widgetBuild');

        // delete any existing widget
        const existingWidget = document.getElementById('hooray-chatbot-widget');
        existingWidget?.remove();

        // create new widget
        const widget = document.createElement('div');
        widget.id = 'hooray-chatbot-widget';

        widget.style.fontFamily = this.chatbot.branding.fontFamily;
        widget.style.position = 'fixed';
        widget.style.height = '550px';
        widget.style.width = '400px';
        widget.style.borderRadius = '10px';
        widget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        widget.style.transition = 'all 0.2s ease';
        widget.style.zIndex = '9999';
        widget.style.bottom = '75px';
        widget.style.backgroundColor = this.chatbot.branding.colors.primaryLight;
        if (this.chatbot.settings.pageLocation === 'bottom-right') {
            widget.style.right = '15px';
        } else if (this.chatbot.settings.pageLocation === 'bottom-left') {
            widget.style.left = '15px';
        } else {
            console.error('Invalid page location');
        }

        widget.style.display = 'none'; // start hidden

        // add event listeners
        widget.addEventListener('mouseover', () => { this.widgetHover(); });
        widget.addEventListener('mouseout', () => { this.widgetUnhover(); });
        widget.addEventListener('click', () => { this.widgetClick(); });

        // header
        const header = document.createElement('div');
        header.id = 'hooray-chatbot-widget-header';
        header.style.borderRadius = '10px 10px 0 0';
        header.style.height = '200px';
        header.style.width = '100%';
        header.style.backgroundColor = this.chatbot.branding.colors.primaryDark;
        header.style.display = 'flex';
        header.style.justifyContent = 'center';
        header.style.alignItems = 'center';

        // header content
        const headerWrap = document.createElement('div');
        headerWrap.id = 'hooray-chatbot-widget-header-content';
        headerWrap.style.display = 'flex';
        headerWrap.style.flexDirection = 'column';
        headerWrap.style.justifyWrap = 'center';
        headerWrap.style.alignItems = 'center';
        headerWrap.style.position = 'relative';
        headerWrap.style.top = '0';
        headerWrap.style.bottom = '0';

        // icon
        const headerIcon = document.createElement('img');
        headerIcon.src = this.chatbot.branding.iconSrc;
        headerIcon.style.borderRadius = '50%';
        headerIcon.style.height = '50px';
        headerIcon.style.width = '50px';
        headerWrap.appendChild(headerIcon);

        // bot name
        const headerBotName = document.createElement('div');
        headerBotName.style.color = this.chatbot.branding.colors.primaryLight;
        headerBotName.style.fontSize = '22px';
        headerBotName.style.fontWeight = 'bold';
        headerBotName.style.padding = '15px';
        headerBotName.style.paddingBottom = '0';
        headerBotName.innerHTML = this.chatbot.branding.name;
        headerWrap.appendChild(headerBotName);

        // bot slogan
        const headerBotSlogan = document.createElement('div');
        headerBotSlogan.style.color = this.chatbot.branding.colors.primaryLight;
        headerBotSlogan.style.fontSize = '16px';
        headerBotSlogan.innerHTML = this.chatbot.branding.slogan;
        headerWrap.appendChild(headerBotSlogan);

        // bot info
        const headerBotInfo = document.createElement('div');
        headerBotInfo.style.color = this.chatbot.branding.colors.primaryLight;
        headerBotInfo.style.fontSize = '16px';
        headerBotInfo.style.padding = '15px';
        headerBotInfo.style.paddingBottom = '0';
        headerBotInfo.style.textAlign = 'center';
        headerBotInfo.innerHTML = this.chatbot.branding.subMessage;
        headerWrap.appendChild(headerBotInfo);

        header.appendChild(headerWrap);
        widget.appendChild(header);

        // input wrap
        const inputWrap = document.createElement('div');
        inputWrap.id = 'hooray-chatbot-widget-input-wrap';
        inputWrap.style.height = '50px';
        inputWrap.style.position = 'absolute';
        inputWrap.style.justifyContent = 'flex-end'; // Align items to the end (right side)
        inputWrap.style.display = 'flex';
        inputWrap.style.bottom = '0';
        inputWrap.style.left = '0';
        inputWrap.style.right = '0';
        inputWrap.style.fontFamily = this.chatbot.branding.fontFamily;
        inputWrap.style.borderTop = '1px solid ' + '#b9b9b9';
        inputWrap.style.borderRadius = '0 0 10px 10px';
        inputWrap.style.backgroundColor = this.chatbot.branding.colors.primaryLight;
        inputWrap.style.padding = '10px';
        inputWrap.style.color = this.chatbot.branding.colors.primaryDark;
        widget.appendChild(inputWrap);

        // input
        const input = document.createElement('input');
        input.id = 'hooray-chatbot-widget-input';
        input.placeholder = this.chatbot.branding.inputDefaultPlaceholder;

        input.style.height = '50px';
        input.style.position = 'absolute';
        input.style.bottom = '0';
        input.style.border = 'none';
        input.style.boxShadow = 'none';
        input.style.outline = 'none';
        input.style.padding = '0';
        input.style.margin = '0';
        input.style.background = 'none';
        input.style.left = '0';
        input.style.right = '60px';
        input.style.fontFamily = this.chatbot.branding.fontFamily;
        input.style.fontSize = '16px';
        input.style.lineHeight = '16px';
        input.style.borderRadius = '0 0 10px 10px';
        input.style.backgroundColor = this.chatbot.branding.colors.primaryLight;
        input.style.padding = '10px 20px';
        input.style.color = this.chatbot.branding.colors.primaryDark;

        // for some reason, 'this.sendClick' doesn't work in the event listener below
        // wrapping the function in this 'sendClickWorkaroundFunction' function seems to work
        const sendClickWorkaroundFunction = async() => {
            await this.sendClick();
        }

        input.addEventListener('focus', function () {
            document.addEventListener('keypress', async function (event) {
                if (event.key === 'Enter' || event.key === '13') {
                    console.log('enter pressed');
                    await sendClickWorkaroundFunction();
                }
            });
        });

        // send wrap
        const sendWrap = document.createElement('div');
        sendWrap.id = 'hooray-chatbot-widget-send-wrap';
        sendWrap.style.height = '72px';
        sendWrap.style.width = '60px';
        sendWrap.style.display = 'flex';
        sendWrap.style.alignItems = 'center'; // Center items vertically
        sendWrap.style.justifyContent = 'center'; // Center items horizontally
        sendWrap.style.cursor = 'pointer';
        sendWrap.style.position = 'absolute';
        sendWrap.style.bottom = '0';
        sendWrap.style.right = '0';

        // send button
        const send = document.createElement('div');
        send.id = 'hooray-chatbot-widget-send';
        send.style.borderRadius = '50%';
        send.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <g fill="${this.chatbot.branding.colors.primaryDark}">
                        <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="m4.01 6.03 7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3 2 10l15 2-15 2 .01 7L23 12 2.01 3z"/>
                </svg>`;

        // add event listeners
        send.addEventListener('mouseover', () => { this.sendHover(); });
        send.addEventListener('mouseout', () => { this.sendUnhover(); });
        send.addEventListener('click', () => { this.sendClick(); });

        // assemble
        sendWrap.appendChild(send);
        inputWrap.appendChild(input);
        inputWrap.appendChild(sendWrap);
        widget.appendChild(inputWrap);

        // hooray branding
        if (this.chatbot.branding.hoorayBranded) {
            const hooray = document.createElement('div');
            hooray.style.position = 'relative';
            hooray.style.top = '3px';
            hooray.style.right = '0';
            hooray.style.left = '0';
            hooray.style.color = '#777';
            hooray.style.display = 'flex';
            hooray.style.justifyContent = 'center';
            hooray.style.alignItems = 'center';
            hooray.style.fontFamily = this.chatbot.branding.fontFamily;
            hooray.style.fontSize = '11px';
            hooray.innerHTML = `
                    Powered by&nbsp;
                    <a
                        title="Hooray Agency"
                        href="https://hooray.agency?utm_campaign=hoorayChatbot&utm_source=${window.location.origin}${window.location.pathname}"
                        target="_blank">
                        Hooray
                    </a>`;

            this.status.widget = 'visible';
            widget.appendChild(hooray);

        }

        const chatbox = document.createElement('div');
        chatbox.id = 'hooray-chatbot-widget-chatbox';
        chatbox.style.overflowY = 'scroll'; // Enable vertical scrolling
        chatbox.style.transition = 'scroll-behavior 0.5s ease-in-out;' // smooth scroll
        chatbox.style.height = '268px';

        // minimize
        const minimize = document.createElement('div');
        minimize.id = 'hooray-chatbot-widget-minimize';
        minimize.innerHTML = '-';

        minimize.style.position = 'absolute';
        minimize.style.top = '0';
        minimize.style.right = '0';
        minimize.style.height = '30px';
        minimize.style.width = '30px';
        minimize.style.border = '1px solid ' + this.chatbot.branding.colors.primaryDark;
        minimize.style.borderRadius = '5px';
        minimize.style.backgroundColor = this.chatbot.branding.colors.primaryLight
        minimize.style.color = this.chatbot.branding.colors.primaryDark;
        minimize.style.display = 'flex';
        minimize.style.justifyContent = 'center';
        minimize.style.alignItems = 'center';
        minimize.style.cursor = 'pointer';

        // event listener
        minimize.addEventListener('click', () => { this.widgetClose(); });

        widget.style.display = 'block';
        widget.appendChild(chatbox);
        widget.appendChild(minimize);
        document.body.appendChild(widget);

        // add suggestions
        this.addSuggestions(this.chatbot.suggestions);

    }
    widgetHover() {
        console.log('widgetHover');

        const widget = document.getElementById('hooray-chatbot-widget');


    }
    widgetUnhover() {
        console.log('widgetUnhover');

        const widget = document.getElementById('hooray-chatbot-widget');

    }
    widgetClick() {
        console.log('widgetClick');

        const widget = document.getElementById('hooray-chatbot-widget');
    }
    widgetOpen() {
        console.log('widgetOpen');

        this.noticeClose();

        //  building widget only on open
        const widget = document.getElementById('hooray-chatbot-widget');
        if (widget) {
            widget.style.display = 'block';
        } else {
            this.widgetBuild();
        }

        // focus input
        const input = document.getElementById('hooray-chatbot-widget-input');
        input.focus();

        this.status.widget = 'visible';
    }
    widgetClose() {
        console.log('widgetClose');

        this.noticeOpen();

        // hide widget
        const widget = document.getElementById('hooray-chatbot-widget');
        widget.style.display = 'none';

        this.status.widget = 'hidden';
    }

    // suggestions
    addSuggestions(suggestionTextArray) {

        if (suggestionTextArray) {

            // create suggestion wrapper (allowing inline-block)
            const suggestionContainer = document.createElement('div');
            suggestionContainer.className = 'hooray-chatbot-suggestion-container'; // using 'container' as a class name as the 'suggestions' already utilize a 'wrapper'
            suggestionContainer.style.display = 'flex';
            suggestionContainer.style.flexWrap = 'wrap';
            suggestionContainer.style.justifyContent = 'right';
            suggestionContainer.style.alignItems = 'center';
            suggestionContainer.style.margin = '10px';

            // 60% width of the chatbox, up against the right side
            suggestionContainer.style.width = '65%';
            suggestionContainer.style.position = 'absolute';
            suggestionContainer.style.bottom = '70px';
            suggestionContainer.style.right = '0';

            // append
            const chatbox = document.getElementById('hooray-chatbot-widget-chatbox');
            chatbox.appendChild(suggestionContainer);

            // add suggestions
            for (let i = 0; i < suggestionTextArray.length; i++) {

                // individual styling, event listeners and appending is done in the 'addUserSuggestionBubble' function
                this.addUserSuggestionBubble(suggestionTextArray[i]);
            }
        }

    }
    addUserSuggestionBubble(suggestionText) {

        // create suggestion wrapper (used for right-aligning)
        const suggestionWrapper = document.createElement('div');
        suggestionWrapper.className = 'hooray-chatbot-suggestion-wrapper';
        suggestionWrapper.style.textAlign = 'right';
        suggestionWrapper.style.textAlign = 'right';

        // create suggestion
        const suggestion = document.createElement('div');
        suggestion.className = 'hooray-chatbot-suggestion';
        suggestion.innerHTML = suggestionText;
        suggestion.style.cursor = 'pointer';
        suggestion.style.padding = '10px';
        suggestion.style.margin = '3px';
        suggestion.style.borderRadius = '6px';
        suggestion.style.display = 'inline-block';
        suggestion.style.border = '1px solid #777';
        suggestion.style.backgroundColor = this.chatbot.branding.colors.primaryLight;
        suggestion.style.color = this.chatbot.branding.colors.primaryDark;

        // add event listeners
        suggestion.addEventListener('mouseover', () => {
            suggestion.style.backgroundColor = this.chatbot.branding.colors.primaryDark;
            suggestion.style.color = this.chatbot.branding.colors.primaryLight;
        });
        suggestion.addEventListener('mouseout', () => {
            suggestion.style.backgroundColor = this.chatbot.branding.colors.primaryLight;
            suggestion.style.color = this.chatbot.branding.colors.primaryDark;
        });
        suggestion.addEventListener('click', () => {

            // putting the text in the input element as if the user typed it
            // the input.value is what is then processed by the sendClick function
            document.getElementById('hooray-chatbot-widget-input').value = suggestionText;
            this.sendClick();

        });

        // append
        suggestionWrapper.appendChild(suggestion);

        const suggestionContainer = document.querySelector('.hooray-chatbot-suggestion-container');
        suggestionContainer.appendChild(suggestionWrapper);

        // scroll to bottom
        const chatbox = document.getElementById('hooray-chatbot-widget-chatbox');
        chatbox.scrollTop = chatbox.scrollHeight;

    }

    // send
    sendHover() {
        console.log('sendHover');

        const send = document.getElementById('hooray-chatbot-widget-send');
        send.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        send.style.transform = 'scale(1.07)';
    }
    sendUnhover() {
        console.log('sendUnhover');

        const send = document.getElementById('hooray-chatbot-widget-send');
        send.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0)';
        send.style.transform = 'scale(1)';
    }
    async sendClick() {
        console.log('sendClick');

        // remove any suggestions
        const suggestions = document.querySelectorAll('.hooray-chatbot-suggestion-wrapper');
        for (let i = 0; i < suggestions.length; i++) {
            suggestions[i].remove();
        }

        const input = document.getElementById('hooray-chatbot-widget-input');
        const messageText = input.value;

        if (messageText.length < 1) {
            return;
        }

        this.addUserMessageBubble(messageText);
        input.value = '';
        input.focus();

        if (!this.thread_id) {
            await this.firstUserMessage({
                assistant_id: this.chatbot.dev.openAi.assistantId,
                messageText
            });

        } else {
            await this.userMessage({
                assistant_id: this.chatbot.dev.openAi.assistantId,
                thread_id: this.thread_id,
                messageText,
            })
        }
    }

    // ai
    // https://platform.openai.com/docs/assistants/whats-new
    async createNewAssistant() {
        console.log('createNewAssistant');
        let assistant = await fetch('https://api.openai.com/v1/assistants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
                'OpenAI-Beta': 'assistants=v2'
            },
            body: JSON.stringify({
                "name": "Math Tutor",
                'description': 'Personal math tutor',
                "instructions": "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
                "tools": [{"type": "code_interpreter"}],
                "model": "gpt-4-turbo"
            })
        });
        assistant = await assistant.json();
        this.assistant_id = assistant.id;
    }
    async firstUserMessage({assistant_id, messageText}) {
        console.log('firstUserMessage');

        // create new assistant if none is provided by the config
        try {
            if (!assistant_id) {
                await this.createNewAssistant();
            }
        } catch (error) {
            console.error('Error in firstUserMessage / createNewAssistant:', error);
            throw error;
        }

        // this will pull the new assistant_id from the config if it was just created from a new assistant
        // or fallback to the one provided in the config
        assistant_id = this.assistant_id || assistant_id;

        try {

            let run = await fetch('https://api.openai.com/v1/threads/runs/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                    'OpenAI-Beta': 'assistants=v2'
                },
                body: JSON.stringify({
                    assistant_id,
                    thread: { messages: [{ role: "user", content: messageText }] }
                })
            });
            run = await run.json();
            return await this.awaitResponse(run);
        } catch (error) {
            console.error('Error in firstUserMessage:', error);
            throw error; // Propagate the error for handling in the calling code
        }
    }
    async userMessage({assistant_id, thread_id, messageText}) {
        try {
            console.log('userMessage');

            let addMessage = await fetch(`https://api.openai.com/v1/threads/${thread_id}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                    'OpenAI-Beta': 'assistants=v2'
                },
                body: JSON.stringify({
                    role: "user",
                    content: messageText
                })
            });
            await addMessage.json();

            let run = await fetch(`https://api.openai.com/v1/threads/${thread_id}/runs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                    'OpenAI-Beta': 'assistants=v2'
                },
                body: JSON.stringify({ assistant_id })
            });
            run = await run.json();
            this.awaitResponse(run);

        } catch (error) {
            console.error('Error in userMessage:', error);
            throw error; // Propagate the error for handling in the calling code
        }
    }
    async awaitResponse(run) {
        console.log('awaitResponse');
        while(['queued', 'in_progress', 'cancelling'].includes(run.status)) {
            await new Promise(resolve => setTimeout(resolve, 500));
            this.thread_id = run.thread_id;

            run = await fetch(`https://api.openai.com/v1/threads/${this.thread_id}/runs/${run.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'OpenAI-Beta': 'assistants=v2'
                },
            });
            run = await run.json();
            console.log(`The current status of the run is: ${run.status}`);
        }

        let messages = await fetch(`https://api.openai.com/v1/threads/${this.thread_id}/messages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
                'OpenAI-Beta': 'assistants=v2'
            },
        });

        messages = await messages.json();
        messages.data.reverse();
        const lastMessage = messages.data[messages.data.length - 1];
        const lastMessageContent = lastMessage.content[0].text.value;

        this.addAiMessageBubble(lastMessageContent);
    }

    // ui chat bubbles
    // https://stackoverflow.com/questions/66472149/css-bubble-chat-slide-up-animation
    addUserMessageBubble(message) {

        // create user message bubble
        const userMessageBubble = document.createElement('div');
        userMessageBubble.className = 'hooray-chatbot-user-message';
        userMessageBubble.innerHTML = message;

        // style
        const readyElement = this.messageBubbleStyling(userMessageBubble);

        // append to chatbox
        const chatbox = document.getElementById('hooray-chatbot-widget-chatbox');
        chatbox.appendChild(readyElement);

        // scroll to bottom
        chatbox.scrollTop = chatbox.scrollHeight;

    }
    addAiMessageBubble(message) {

        // create ai message bubble
        const aiMessageBubble = document.createElement('div');
        aiMessageBubble.className = 'hooray-chatbot-ai-message';
        aiMessageBubble.innerHTML = message;

        // style
        const readyElement = this.messageBubbleStyling(aiMessageBubble);

        // append to chatbox
        const chatbox = document.getElementById('hooray-chatbot-widget-chatbox');
        chatbox.appendChild(readyElement);

        // scroll to bottom
        chatbox.scrollTop = chatbox.scrollHeight;
    }
    messageBubbleStyling(bubbleEl) {

        // wrapper (used for vertical ordering)
        const wrapper = document.createElement('div');

        // timestamp
        const timestamp = document.createElement('div');
        timestamp.style.color = '#777';
        timestamp.style.fontSize = '12px';
        timestamp.style.marginTop ='0px';
        timestamp.style.marginBottom = '10px';
        timestamp.style.marginLeft = '12px';
        timestamp.style.marginRight = '19px'; //  giving some space to the scrollbar on the right side
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const time = hours + ':' + minutes + ' ' + ampm;
        timestamp.innerHTML = time;

        // bubble styles valid for both the ai messages and the user messages
        bubbleEl.style.padding = '10px';
        bubbleEl.style.margin = '5px 10px';
        bubbleEl.style.borderRadius = '6px';
        bubbleEl.style.display = 'inline-block';
        bubbleEl.style.maxWidth = '80%';

        const className = bubbleEl.className; // using className as a styling indication (className set in the addUserMessageBubble and addAiMessageBubble functions)

        // user message-specific styling
        if (className === 'hooray-chatbot-user-message') {
            bubbleEl.style.position = 'relative';
            bubbleEl.style.right = '0';
            bubbleEl.style.backgroundColor = this.chatbot.branding.colors.primaryLight;
            bubbleEl.style.border = '1px solid #777';
            bubbleEl.style.textAlign = 'right';
            bubbleEl.style.margin = '5px 17px'; // upping from default right side margin set above to give breathing room to the scrollbar
            timestamp.style.textAlign = 'right';
            wrapper.style.textAlign = 'right';

            // ai message-specific styling
        } else if (className === 'hooray-chatbot-ai-message') {
            bubbleEl.style.position = 'relative';
            bubbleEl.style.left = '0';
            bubbleEl.style.backgroundColor = this.chatbot.branding.colors.primaryDark;
            bubbleEl.style.color = this.chatbot.branding.colors.primaryLight;
            bubbleEl.style.textAlign = 'left';
            timestamp.style.textAlign = 'left';
            wrapper.style.textAlign = 'left';

        } else {
            console.error('invalid bubbleEl.className')
        }

        // assemble
        wrapper.appendChild(bubbleEl);
        wrapper.appendChild(timestamp);
        return wrapper;

    }

}
