# 🎁 lucky-package

Feeling lucky? Try installing a random npm package

## ⚠️ Disclaimer

Even though `lucky-package` excludes packages with pre/post-install scripts by default, installing random npm packages can still carry risks such as vulnerabilities or malicious code. Always review package details before use. Use the `--unsafe` flag with caution and at your own risk.

## 📥 Installation

```
$ npm install -g lucky-package
```

## 🧐 Usage

### Examples


Install a random package:
```
$ lucky-package

  [1/4] 🔎 Searching for a lucky package...
  [2/4] 🎉 Found it! shittier
  [3/4] 🚀 Installing...
  
  added 119 packages in 7s
  
  14 packages are looking for funding
    run `npm fund` for details
  
  [4/4] ✅ Installed successfully! Run lucky-package --help to see all options

```

Feeling ✨ extra ✨ lucky? Try providing the `--unsafe` flag to include **potentially dangerous packages** that contain pre/post-install scripts. Good luck 🙂🙏
```
$ lucky-package --unsafe
```

Install multiple random packages at once:

```
$ lucky-package --amount 3
```

Uninstall the recently installed packages:

```
$ lucky-package --rollback
```

### Options

```
$ lucky-package --help

  Usage: lucky-package [options]

  Options:
    -V, --version          output the version number
    -a, --amount <number>  specify a number of random packages to install (default: 1)
    -u, --unsafe           include potentially unsafe packages
    -g, --global           install package(s) globally
    -h, --help             display help
```
