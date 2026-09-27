# Jev Jurisprudence Shift

    **Compare French court holdings and surface reviewable changes in jurisprudential direction.**

    [![Tests](https://github.com/gbesse/jev-jurisprudence-shift/actions/workflows/test.yml/badge.svg)](https://github.com/gbesse/jev-jurisprudence-shift/actions/workflows/test.yml) [MIT](LICENSE) · Node.js 22+ · Public alpha

    ## Try it

    ```sh
    git clone https://github.com/gbesse/jev-jurisprudence-shift.git
    cd jev-jurisprudence-shift
    npm install
    npm run demo
    ```

    The demo uses synthetic records and fixture probabilities. It makes no network call and makes no claim about measured Jev quality.

    ## Use the library

    Import the domain functions from `@gbesse/jev-jurisprudence-shift` and provide either `createJevClient()` from the `./jev` export or the offline `createFakeProvider()` test double. The complete runnable path is in `examples/demo.mjs`.

    ## Decision boundary

    Dates, identity and source references are validated in code. Jev compares only supplied holdings. Every result is a research lead requiring a jurist to inspect the full decisions and current law.

    ## Data provenance

    Judilibre exposes Court of Cassation decisions, while the Conseil d’État publishes administrative case law through ArianeWeb and its open-data service. The package accepts normalized records from either source.

    Official references:

    - [https://www.data.gouv.fr/datasets/api-judilibre](https://www.data.gouv.fr/datasets/api-judilibre)
- [https://www.conseil-etat.fr/decisions-de-justice/jurisprudence/rechercher-une-decision-arianeweb](https://www.conseil-etat.fr/decisions-de-justice/jurisprudence/rechercher-une-decision-arianeweb)

    Keep upstream attribution, source URLs, retrieval dates and original identifiers with every derived record.

    ## Real Jev requests

    Real requests are opt-in, paid, and sent to `https://api.typesafe.ai/v1/systemone`. The client pins `jev-1.13.0`, validates the returned model and all probabilities, rejects redirects, retries only network failures plus HTTP 429/529, and refuses state above a conservative 24,000-token estimate.

    ```sh
    TYPESAFE_API_KEY=... node scripts/live-smoke.mjs
    ```

    Never send personal data, secrets, or full unredacted case files. Evaluate representative French labels before operational use.

    ## Validation

    `npm run validate` runs syntax checks, strict public-type checks, tests, and the offline demo on Node.js 22 and 24 in CI.

    Independent project; not affiliated with TypeSafe AI or the French administration. See the [Jev API documentation](https://docs.typesafe.ai/api) and [model limitations](https://docs.typesafe.ai/model-jaggedness/jev-1.13).
