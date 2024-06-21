import config from "./config";

const login = async (userId: number) => {
  try {
    const authenticated = await fetch(`${config.URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    return authenticated.json() as Promise<{
      token: string;
      refreshToken: string;
      user: {
        id: number;
        fullName: string;
        birthdate: string;
        createdAt: string;
        updatedAt: string;
      };
    }>;
  } catch (error) {
    console.log(`${config.URL}/auth/login`, error);
    throw new Error("Could not authenticate user!");
  }
};

const authClient = {
  login,
};

export default authClient;
