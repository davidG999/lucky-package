# 🎁 lucky-package

Feeling lucky? Try installing a random npm package

## ⚠️ Disclaimer

**While `lucky-package` performs security checks before installing anything, there's no guaranteed safety; a malicious
or vulnerable package could still exist that has no security vulnerabilities publicly disclosed and passes all the
checks. For more details, see [Security concerns section](#-security-concerns).**

## 📥 Installation

```shell
npm install -g lucky-package
```

## 🧐 Examples

Install a random package:

```console
$ lucky-package install

  [1/4] 🔎 Searching for a lucky package...
  [2/4] 🎉 Found it! shittier
  [3/4] 🚀 Installing...
  
  added 25 packages in 4s
  
  [4/4] ✅ Installed successfully! Run lucky-package --help to see all options
```

Install several random packages at once:

```shell
lucky-package install --amount=3
```

Undo the most recent installation:

```shell
lucky-package rollback
```

Feeling ✨ extra ✨ lucky? Try providing the `--unsafe` flag to include **potentially dangerous packages** in the search.
Good luck 🙂🙏

```shell
lucky-package install --unsafe
```

## 📖 Usage

| Command    | Alias | Options                          | Description                                                                                             |
|------------|-------|----------------------------------|---------------------------------------------------------------------------------------------------------|
| `install`  | `i`   | `-a, --amount <number>`          | Number of random packages to install. <br/> Default: `1`                                                |
|            |       | `-u, --unsafe`                   | **Disables all preinstall security checks** to include **potentially dangerous packages** in the search |
|            |       | `-g, --global`                   | Install packages globally                                                                               |
| `rollback` | `r`   | `-l, --last` (default behaviour) | Uninstall the most recent installed package(s) by `lucky-package`                                       |
|            |       | `-a, --all`                      | Uninstall all packages installed by `lucky-package`                                                     |
| `config`   | `c`   | `-a, --audit <boolean>`          | Specify whether to run `npm audit` after installation. <br> Default: `false`                            |

## 👮 Security concerns

### Preinstall security checks

By default, `lucky-package` uses [npq](https://github.com/lirantal/npq/) to analyze each package before installation.
This handy tool covers a [range of security checks](https://github.com/lirantal/npq/#marshalls). The following checks
from `npq` are being used:

1. **Scripts** — Excludes packages that have pre/post install script (which could potentially be malicious).
2. **Snyk** — Excludes packages that have been found with vulnerabilities
   in [Snyk's database](https://security.snyk.io/).
3. **Typosquatting** — Excludes packages with names similar to popular packages.
   See [typosquatting](https://docs.npmjs.com/threats-and-mitigations#by-typosquatting--dependency-confusion).

#### Why only these three checks?

Running every `npq` check and finding a package that passes all of them can be very slow, which could ruin the fun! The
checks are balanced for speed and safety.

#### Using `--unsafe` option

The `--unsafe` option **disables all preinstall security checks** mentioned above. This can lead to the installation of
**risky or malicious packages** and is **not recommended** unless you know what you're doing.

### Postinstall security checks

By default, `npm audit` is disabled with the `--no-audit` flag during installation, so you won't see audit messages like
these:

```console
audited 262 packages in 2s

found 0 vulnerabilities
```

#### Why is `npm audit` disabled by default?

The `npm audit` command is disabled by default to enhance the installation speed of your packages. Since security checks
are already performed during the pre-installation phase using `npq`, running `npm audit` afterward can
prolong the process. <br>
If you prefer to enable this additional layer of security, you can easily configure the `audit` option:

```shell
lucky-package config --audit=true
```
