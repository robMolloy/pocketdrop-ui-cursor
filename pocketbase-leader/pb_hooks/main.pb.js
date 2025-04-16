onTerminate((e) => {
  console.log("[custom hook] PocketBase is shutting down");

  e.next();
});
