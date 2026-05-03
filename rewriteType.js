let body = $response.body;

body = body.replace(
/(- name: 🔰 选择节点[\s\S]*?type:\s*)select/,
"$1url-test"
);

if (!/🔰 选择节点[\s\S]*?url:/.test(body)) {
  body = body.replace(
    /(- name: 🔰 选择节点[\s\S]*?type:\s*url-test)/,
`$1
    url: http://www.gstatic.com/generate_204
    interval: 300
    tolerance: 50`
  );
}

$done({ body });
