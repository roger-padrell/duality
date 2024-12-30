async function checkSDL2Installed(): Promise<boolean> {
    try {
        // Check if SDL2 is available by attempting to query its version
        const process = Deno.run({
            cmd: ["sdl2-config", "--version"],
            stdout: "null",
            stderr: "null",
        });
        const status = await process.status();
        process.close();
        return status.success;
    } catch {
        return false;
    }
}

async function installSDL2() {
    const os = Deno.build.os;

    if (os === "linux") {
        console.log("Attempting to install SDL2 on Linux...");
        const process = Deno.run({
            cmd: ["sudo", "apt-get", "update"],
            stdout: "inherit",
            stderr: "inherit",
        });
        await process.status();
        process.close();

        const installProcess = Deno.run({
            cmd: ["sudo", "apt-get", "install", "-y", "libsdl2-dev"],
            stdout: "inherit",
            stderr: "inherit",
        });
        await installProcess.status();
        installProcess.close();
    } else if (os === "darwin") {
        console.log("Attempting to install SDL2 on macOS...");
        const installProcess = Deno.run({
            cmd: ["brew", "install", "sdl2"],
            stdout: "inherit",
            stderr: "inherit",
        });
        await installProcess.status();
        installProcess.close();
    } else if (os === "windows") {
        console.log("SDL2 installation on Windows is not automated. Please download and install SDL2 manually from https://libsdl.org.");
    } else {
        console.error("Unsupported operating system. Unable to install SDL2.");
    }
}

async function SDL2() {
    console.log("Checking if SDL2 is installed...");

    const isInstalled = await checkSDL2Installed();
    if (isInstalled) {
        console.log("SDL2 is already installed!");
    } else {
        console.log("SDL2 is not installed. Attempting to install...");
        await installSDL2();

        const recheck = await checkSDL2Installed();
        if (recheck) {
            console.log("SDL2 successfully installed!");
        } else {
            console.error("Failed to install SDL2. Please install it manually.");
        }
    }
}

SDL2().catch((err) => {
    console.error("An error occurred:", err.message);
});

export default SDL2;