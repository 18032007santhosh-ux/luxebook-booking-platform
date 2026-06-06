const fs = require('fs');
const path = require('path');

const screens = [
  {
    title: "Splash Screen",
    filename: "splash_screen.html",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ5Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpYCiVodG1sXzAwMDY1MzVhN2YzNTE2YmEwODI5YjhlZDI5MmE0YmFhEgsSBxC5m-y7_h0YAZIBIQoKcHJvamVjdF9pZBITQhE1NTkzOTY1NTY0MTIxODY4Nw&filename=&opi=89354086"
  },
  {
    title: "LuxeBook Cinematic Evolution",
    filename: "cinematic_evolution.html",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ5Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpYCiVodG1sXzAwMDY1MzVhN2YzNTE2YWYwODI5YjhlZDI5MmE0YmFhEgsSBxC5m-y7_h0YAZIBIQoKcHJvamVjdF9pZBITQhE1NTkzOTY1NTY0MTIxODY4Nw&filename=&opi=89354086"
  },
  {
    title: "Explore Services",
    filename: "explore_services.html",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ5Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpYCiVodG1sXzAwMDY1MzVhN2YzNTE2YzQwODI5YjhlZDI5MmE0YmFhEgsSBxC5m-y7_h0YAZIBIQoKcHJvamVjdF9pZBITQhE1NTkzOTY1NTY0MTIxODY4Nw&filename=&opi=89354086"
  },
  {
    title: "LuxeBook World-Class Homepage",
    filename: "index.html",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ5Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpYCiVodG1sXzAwMDY1MzVhN2YzNTE2YjQwODI5YjhlZDI5MmE0YmFhEgsSBxC5m-y7_h0YAZIBIQoKcHJvamVjdF9pZBITQhE1NTkzOTY1NTY0MTIxODY4Nw&filename=&opi=89354086"
  },
  {
    title: "Admin Business Intelligence",
    filename: "admin_bi.html",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ5Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpYCiVodG1sXzAwMDY1MzVhN2YzNTE2YTkwODI5YjhlZDI5MmE0YmFhEgsSBxC5m-y7_h0YAZIBIQoKcHJvamVjdF9pZBITQhE1NTkzOTY1NTY0MTIxODY4Nw&filename=&opi=89354086"
  },
  {
    title: "Secure Checkout",
    filename: "checkout.html",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ5Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpYCiVodG1sXzAwMDY1MzVhN2YzNTE2YWQwODI5YjhlZDI5MmE0YmFhEgsSBxC5m-y7_h0YAZIBIQoKcHJvamVjdF9pZBITQhE1NTkzOTY1NTY0MTIxODY4Nw&filename=&opi=89354086"
  },
  {
    title: "Shader",
    filename: "shader.html",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ5Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpYCiVodG1sXzAwMDY1MzVhN2YzNTE2YjIwODI5YjhlZDI5MmE0YmFhEgsSBxC5m-y7_h0YAZIBIQoKcHJvamVjdF9pZBITQhE1NTkzOTY1NTY0MTIxODY4Nw&filename=&opi=89354086"
  },
  {
    title: "Portfolio Management",
    filename: "portfolio_management.html",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ5Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpYCiVodG1sXzAwMDY1MzVhN2YzNTE2YmMwODI5YjhlZDI5MmE0YmFhEgsSBxC5m-y7_h0YAZIBIQoKcHJvamVjdF9pZBITQhE1NTkzOTY1NTY0MTIxODY4Nw&filename=&opi=89354086"
  },
  {
    title: "Calendar Booking Experience",
    filename: "calendar_booking.html",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ5Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpYCiVodG1sXzAwMDY1MzVhN2YzNTE2YTcwODI5YjhlZDI5MmE0YmFhEgsSBxC5m-y7_h0YAZIBIQoKcHJvamVjdF9pZBITQhE1NTkzOTY1NTY0MTIxODY4Nw&filename=&opi=89354086"
  },
  {
    title: "Booking Confirmed",
    filename: "booking_confirmed.html",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ5Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpYCiVodG1sXzAwMDY1MzVhN2YzNTE2YjYwODI5YjhlZDI5MmE0YmFhEgsSBxC5m-y7_h0YAZIBIQoKcHJvamVjdF9pZBITQhE1NTkzOTY1NTY0MTIxODY4Nw&filename=&opi=89354086"
  },
  {
    title: "Login Portal",
    filename: "login_portal.html",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ5Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpYCiVodG1sXzAwMDY1MzVhN2YzNTE2YzAwODI5YjhlZDI5MmE0YmFhEgsSBxC5m-y7_h0YAZIBIQoKcHJvamVjdF9pZBITQhE1NTkzOTY1NTY0MTIxODY4Nw&filename=&opi=89354086"
  }
];

async function downloadAll() {
  console.log(`Starting download of ${screens.length} screens...`);
  for (const screen of screens) {
    console.log(`Downloading: ${screen.title} -> ${screen.filename}...`);
    try {
      const response = await fetch(screen.url);
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const text = await response.text();
      fs.writeFileSync(path.join(__dirname, screen.filename), text, 'utf-8');
      console.log(`Successfully saved ${screen.filename}`);
    } catch (err) {
      console.error(`Error downloading ${screen.title}:`, err.message);
    }
  }
  console.log("Download complete!");
}

downloadAll();
