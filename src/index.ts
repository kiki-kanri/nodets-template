async function main() {
	console.log('Hello world!');
}

(async () => require.main === module && await main())();
