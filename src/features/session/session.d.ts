type User = {
   token: string;
   email: string | any;
   bio?: string | undefined;
   displayName?: string | undefined;
   photoUrl?: string | undefined;
   uid?: string | number | undefined;
   createdAt: number;
   creationTime?: string | undefined;
   lastLoginAt: number;
   lastSignInTime?: string | undefined;
};

export type Dimensions = {
   wi: number;
   he: number;
};

export interface SessionState {
   loginDisplay: number | any; // 0 hide login, 1 show login, 2 show logout
   loginDisplayLastClicked: number | string | undefined; // 0=close 1=logout, 2=login/info
   paused: boolean;
   toggle: boolean;
   status: "idle" | "loading" | "failed";
   user: User;
   value: number;
   speed: number; // speed in seconds of the site (animations)
   darkMode: boolean;
   dim: Dimensions;
}
