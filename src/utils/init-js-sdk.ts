import tcb from "tcb-js-sdk";

export const app = tcb.init({
    env: "angus-server-6g36j4y8db4fbe91",
});

export const logintcb = async () => {
    const auth = app.auth({
        persistence: 'local'
    })
    await auth.anonymousAuthProvider().signIn()
}

