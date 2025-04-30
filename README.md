# 🎁 lucky-package

Feeling lucky? Try installing a random npm package

## ⚠️ Disclaimer

Even though `lucky-package` excludes packages with pre/post-install scripts by default, installing random npm packages can still carry risks such as vulnerabilities or malicious code. Always review package details before use. Use the `--unsafe` flag with caution and at your own risk.

## 📥 Installation

```
$ npm install -g lucky-package
```

## 🧐 Examples

Install a random package:
```
$ lucky-package search

  [1/4] 🔎 Searching for a lucky package...
  [2/4] 🎉 Found it! shittier
  [3/4] 🚀 Installing...
  
  added 119 packages in 7s
  
  14 packages are looking for funding
    run `npm fund` for details
  
  [4/4] ✅ Installed successfully! Run lucky-package --help to see all commands
```

Install multiple random packages at once:
```
$ lucky-package search --amount=3
```

Uninstall the recently installed packages:
```
$ lucky-package rollback
```

Feeling ✨ extra ✨ lucky? Try providing the `--unsafe` flag to include **potentially dangerous packages** that contain pre/post-install scripts. Good luck 🙂🙏
```
$ lucky-package search --unsafe
```

## 📖 Usage

| Command    | Alias | Options                 | Description                                                |
|------------|-------|-------------------------|------------------------------------------------------------|
| `search`   | `s`   | `-a, --amount <number>` | Number of random packages to install. <br/> Default: `1`   |
|            |       | `-u, --unsafe`          | Include potentially unsafe packages (with install scripts) |
|            |       | `-g, --global`          | Install packages globally                                  |
| `rollback` | `r`   | `-l, --last` (default)  | Uninstall the last installed package(s) by lucky-package   |
|            |       | `-a, --all`             | Uninstall all packages installed by lucky-package          |
