import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
    process.env.AUTH_SECRET!
);

export async function criarToken(username: string) {
    return await new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(username)
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);
}

export async function verificarToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);

        return payload.sub ?? null;

    } catch {
        return null;
    }
}