// Global type declarations for production memory storage
declare global {
    namespace NodeJS {
        interface Global {
            __verification_storage: {
                verifications: any[];
            };
        }
    }
}

export { };
