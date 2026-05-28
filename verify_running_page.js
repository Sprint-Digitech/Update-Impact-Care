const http = require('http');

http.get('http://localhost:3000/products', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    console.log('HTML Length:', data.length);
    console.log('Contains ProductsCatalog marker?', data.includes('product-card'));
    console.log('Contains active categories?', data.includes('Calcium Channel Blocker'));
    console.log('Contains Acofan Tablet?', data.includes('Acofan Tablet'));
    console.log('Contains ${c}?', data.includes('${c}'));
  });
}).on('error', (err) => {
  console.error('Fetch error:', err.message);
});
