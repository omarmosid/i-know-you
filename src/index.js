/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const _pick = (obj, props = []) => {
  console.log(obj);
  const picked = props.reduce((acc, curr) => {
    if (obj[curr]) {
      return {
        ...acc,
        [curr]: obj[curr],
      };
    }
  }, {});
  return picked;
};

async function handleRequest(request) {
  const { cf } = request;
  const fields = _pick(cf, [
    "colo",
    "country",
    "city",
    "continent",
    "latitude",
    "longitude",
    "postalCode",
    "region",
    "regionCode",
    "asOrganization",
    "timezone",
  ]);

  const json = JSON.stringify(fields, null, 2);

  return new Response(json, {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}

export default {
  async fetch(request) {
    console.log(request.cf.country);
    return handleRequest(request);
  },
};
