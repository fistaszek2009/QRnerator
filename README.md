<div align="center">

# <img src="./src/assets/QRnerator-Icon-Transparent.png" alt="QRnerator Logo" style="height:30px; width:auto; vertical-align:bottom;"> QRnerator

**A sleek, highly customizable QR code generator with UTF-8 support.**

![React icon](https://img.shields.io/badge/-React-3F8999?logo=react\&logoColor=white\&style=flat)
![Vite icon](https://img.shields.io/badge/-Vite-9752FF?logo=vite\&logoColor=white\&style=flat)
![GitHub commit activity](https://img.shields.io/github/commit-activity/t/fistaszek2009/QRnerator?logo=github&labelColor=%23ad8702&color=%23636362)

 <p align="center">
  <img src="https://github.com/user-attachments/assets/63f51f08-9dc7-4032-8f09-e15a2e3a37c6" height="200"/>
  <img src="https://github.com/user-attachments/assets/4e57b62f-410f-4850-9d3e-c5f07e861bae" height="200"/>
  <img src="https://github.com/user-attachments/assets/c93f8f92-e9df-4577-8877-034d3816949e" height="200"/>
</p>
</div>

-----

### Live Demo

### 👉 https://fistaszek2009.github.io/QRnerator/

### Overview

**QRnerator** was developed as a school project with a clear mission: to combine high-end design with practical utility. Unlike standard generators, QRnerator provides an extensive suite of styling tools while ensuring robust data encoding. There's no need to worry about Polish, Armenian, or Georgian characters in the code.

## Local setup

Follow these steps to get the project running locally:

#### 1\. Clone the repository

```console
git clone https://github.com/fistaszek2009/QRnerator.git
cd QRnerator
```

#### 2\. Install dependencies

```console
npm install
```

#### 3\. Build and Preview

```console
npm run build
npm run preview
```

Then visit: [http://localhost:4173/QRnerator/](http://localhost:4173/QRnerator/)

## Usage & Features

The generator is divided into three core modules for maximum flexibility:

### 1\. Data Types

QRnerator supports **seven** distinct types of data encoding:

| \# | Type | Action upon scanning |
|:---:|:---|:---|
| 1 | **URL** | Opens a website (default) |
| 2 | **Text** | Displays plain text |
| 3 | **Email** | Drafts an email with a pre-filled recipient |
| 4 | **Phone** | Initiates a call to a specific number |
| 5 | **SMS** | Drafts a message with a specific body |
| 6 | **vCard** | Displays a complete contact card |
| 7 | **Wi-Fi** | Connects directly to a specified network |

### 2\. Styling Engine

Customize every part of the QR code (dots, corners, background) with precision:

  * **Dot Styles:** Choose from `square`, `dots`, `classy`, `rounded`, etc.
  * **Color Control:** Supports solid colors (HEX/RGB) or transparent backgrounds.
  * **Gradients:** Linear or radial gradient support.

### 3\. Icon

Embed your own **Logo/Icon** in the center of the QR code to enhance brand recognition without breaking the data integrity.

## References & Credits

### Libraries & Licenses

This project utilizes the following open-source packages:

  * [qr-code-styling](https://www.npmjs.com/package/qr-code-styling) (MIT) - The core engine for QR generation and styling.
  * [qrcode-generator](https://www.npmjs.com/package/qrcode-generator) (MIT) - QR code data as array calculations.
  * [Anime.js](https://animejs.com/) (MIT) - For UI animations.
  * [FontAwesome](https://fontawesome.com/) (CC BY 4.0 / Font Awesome Free License) - Iconography.

### Inspriation

  * **Chris Rapacz ([skanujmnie.pl](https://www.skanujmnie.pl/))** - Design inspiration.
  * **Typography:** Inter (OFL), Office Code Pro (OFL), Young Serif (OFL).
