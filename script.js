document.addEventListener("DOMContentLoaded", function() {
    // Add an event listener to hide the loading video when it ends
    document.getElementById('loadingVideo').addEventListener('ended', function() {
        this.style.display = 'none';
        console.log("test")
    });
});

async function test() {
    try {
        document.getElementById('loadingIcon').style.display = 'inline-block';

        // Start a new conversation
        const threadId = await startConversation();
        if (threadId) {
            console.log('Conversation started with thread ID:', threadId);

            // Send a message and receive a response
            const userInput = document.getElementById("inputTekst").value;
            const response = await sendMessage(threadId, userInput);
            console.log('AI Response:', response);
            //document.getElementById("tekst").innerHTML = response;

            const responseNumber = parseInt(response);
            if (responseNumber >= 7 && responseNumber <= 9) {
                spawnVideo('Pictures/Variant_Latter.mp4');
            }

            if (responseNumber >= 10 && responseNumber <= 10) {
                spawnVideo('Pictures/Variant_Latter.mp4');
                activatePopup();
            }

            if(responseNumber >= 1 && responseNumber <= 3) {
                spawnVideo('Pictures/Variant_Tomat.mp4');
            }

            if(responseNumber >= 4 && responseNumber <= 6) {
                spawnVideo('Pictures/Variant_Meh.mp4');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
    document.getElementById('loadingIcon').style.display = 'none';
}

function activatePopup() {
    
    setTimeout(function() {
       
        const popup = document.getElementById('popup');
        popup.style.display = 'block';

    
        const closeButton = document.getElementById('close');
        closeButton.addEventListener('click', function() {
            popup.style.display = 'none'; 
        });
    }, 3000);
}

function spawnVideo(videoURL) {
    const newVideo = document.createElement('video');
    newVideo.src = videoURL;
    newVideo.autoplay = true;
    newVideo.loop = false;
    newVideo.muted = true;
    newVideo.style.position = 'absolute';
    newVideo.style.top = '0';
    newVideo.style.left = '0';
    newVideo.style.width = '100%';
    newVideo.style.height = '100%';
    newVideo.style.objectFit = 'cover';
    newVideo.style.zIndex = '-1'; // Send the video behind other elements
    
    // Remove existing video elements after playback
    newVideo.addEventListener('ended', function() {
        this.remove();
    });

    // Add new video element before the input field and button
    const container = document.getElementById('videoContainer');
    container.appendChild(newVideo);
}

async function startConversation() {
    try {
        const response = await fetch('https://rate-jokes-postmix2001.replit.app/start');
        const data = await response.json();
        return data.thread_id; // Return the thread ID created by the server
    } catch (error) {
        console.error('Error starting conversation:', error);
        return null;
    }
}

// Function to send a message and receive a response
async function sendMessage(threadId, message) {
    try {
        const response = await fetch('https://rate-jokes-postmix2001.replit.app/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                thread_id: threadId,
                message: message
            })
        });
        const data = await response.json();
        return data.response; // Return the AI assistant's response
    } catch (error) {
        console.error('Error sending message:', error);
        return null;
    }
}

document.getElementById("inputTekst").addEventListener("keypress", function(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === "Enter") {
        // Trigger the click event of the button
        document.getElementById("myBtn").click();
    }
});

