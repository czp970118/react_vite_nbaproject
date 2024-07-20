# egg



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
npm i
npm run dev
open http://localhost:7001/
```

### Deploy

```bash
npm start
npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.

[egg]: https://eggjs.org

### Documentation
*** controller不会自己产出数据，也不会包含复杂的逻辑。 复杂的逻辑应该抽象为业务的server层
