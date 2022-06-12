import { ic04 } from "../../declarations/ic04";
import { Agent, decodeIdentity } from "./agent";

// import { Actor, HttpAgent } from "@dfinity/agent";
// import { AuthClient } from "@dfinity/auth-client";

async function load() {
    const pid = await ic04.pid();
    document.getElementById("greeting").innerText += "caller:" + pid + "\n";
    const ptype = await ic04.getType();
    document.getElementById("greeting").innerText +=
        "type:" + ptype.toString() + "\n";
    const greeting = await ic04.getApproved();
    document.getElementById("greeting").innerText +=
        "isVote:" + greeting + "\n";
    document.getElementById("greeting").innerText += "members:" + "\n";
    const mem = await ic04.getMemebers();
    document.getElementById("greeting").innerText += mem;

    let vote_button = document.getElementById("vote");
    vote_button.onclick = vote;

    let login_btn = document.getElementById("login_button");
    login_btn.onclick = loginII;

    let file_btn = document.getElementById("file");
    file_btn.onclick = instllCode;
}

window.onload = load;

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    let typeinput = document.getElementById("nameInput");
    await ic04.propose(typeinput.value);
    return false;
});

async function vote() {
    await ic04.vote();
}

async function instllCode() {
    let typeinput = document.getElementById("nameInput");
    // input.addEventListener("change", function () {});
    await ic04.install_code(typeinput.value);
}

// async function loginII() {
//     process.env.DFX_NETWORK = local;
//     let iiUrl;
//     if (process.env.DFX_NETWORK === "local") {
//         iiUrl = `http://localhost:8000/?canisterId=${process.env.II_CANISTER_ID}`;
//     } else if (process.env.DFX_NETWORK === "ic") {
//         iiUrl = `https://${process.env.II_CANISTER_ID}.ic0.app`;
//     } else {
//         iiUrl = `https://${process.env.II_CANISTER_ID}.dfinity.network`;
//     }

//     const authClient = await AuthClient.create();

//     await new Promise((resolve, reject) => {
//         authClient.login({
//             identityProvider: iiUrl,
//             onSuccess: resolve,
//             onError: reject,
//         });
//     });
//     // At this point we're authenticated, and we can get the identity from the auth client:
//     const identity = authClient.getIdentity();
//     // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
//     const agent = new HttpAgent({ identity });
//     // Using the interface description of our webapp, we create an actor that we use to call the service methods.
//     const webapp = Actor.createActor(webapp_idl, {
//         agent,
//         canisterId: webapp_id,
//     });
//     // Call whoami which returns the principal (user id) of the current user.
//     const principal = await webapp.whoami();
//     // show the principal on the page
//     console.log(principal.toText());
// }

async function loginII() {
    let login_btn = document.getElementById("login_button");
    await agent.ii_login(async () => {
        await refresh();
        show_account_id();
        if (!agent.is_authenticated()) {
            document.getElementById("banner_error").innerText =
                "Internet Identity login failed. Please try again later.";
        }
    });
}

var last_account_id;
function show_account_id() {
    let account_id = agent.account_id_hex();
    if (account_id != last_account_id) {
        last_account_id = account_id;
    }
}
