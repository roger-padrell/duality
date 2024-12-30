// Import the necessary Deno FFI modules
const dylib = "/lib/x86_64-linux-gnu/libSDL2-2.0.so.0";
// Load the SDL2 dynamic library
const lib = Deno.dlopen(dylib, {
    // SDL initialization
    SDL_Init: { parameters: ["i32"], result: "i32" },
    // Create a window
    SDL_CreateWindow: {
        parameters: ["buffer", "i32", "i32", "i32", "i32", "u32"],
        result: "pointer",
    },
    // Create a renderer
    SDL_CreateRenderer: {
        parameters: ["pointer", "i32", "u32"],
        result: "pointer",
    },
    // Set render draw color
    SDL_SetRenderDrawColor: {
        parameters: ["pointer", "u8", "u8", "u8", "u8"],
        result: "i32",
    },
    // Clear the renderer
    SDL_RenderClear: { parameters: ["pointer"], result: "i32" },
    // Present the renderer
    SDL_RenderPresent: { parameters: ["pointer"], result: "void" },
    // Draw a pixel (rectangle for simplicity)
    SDL_RenderDrawPoint: { parameters: ["pointer", "i32", "i32"], result: "i32" },
    // Delay
    SDL_Delay: { parameters: ["u32"], result: "void" },
    // Quit SDL
    SDL_Quit: { parameters: [], result: "void" },
});

// SDL2 constants
const SDL_INIT_VIDEO = 0x00000020;
const SDL_WINDOWPOS_CENTERED = 0x2FFF0000;
const SDL_WINDOW_SHOWN = 0x00000004;

// Initialize SDL
if (lib.symbols.SDL_Init(SDL_INIT_VIDEO) < 0) {
    throw new Error("Failed to initialize SDL");
}

// Create a window
const window = lib.symbols.SDL_CreateWindow(
    new TextEncoder().encode("Deno SDL2 Example\0"), // Window title
    SDL_WINDOWPOS_CENTERED, // x position
    SDL_WINDOWPOS_CENTERED, // y position
    800,                    // width
    600,                    // height
    SDL_WINDOW_SHOWN        // flags
);
if (window === null) {
    throw new Error("Failed to create SDL window");
}

// Create a renderer
const renderer = lib.symbols.SDL_CreateRenderer(window, -1, 0);
if (renderer === null) {
    throw new Error("Failed to create SDL renderer");
}

// Draw pixels in the renderer
for (let y = 0; y < 600; y++) {
    for (let x = 0; x < 800; x++) {
        lib.symbols.SDL_SetRenderDrawColor(renderer, x % 256, y % 256, (x + y) % 256, 255);
        lib.symbols.SDL_RenderDrawPoint(renderer, x, y);
    }
}

// Show the rendered frame
lib.symbols.SDL_RenderPresent(renderer);

// Delay for a few seconds before quitting
lib.symbols.SDL_Delay(5000);

// Quit SDL
lib.symbols.SDL_Quit();

// Close the dynamic library
lib.close();