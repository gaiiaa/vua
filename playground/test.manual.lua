function main(args)
  print(args)
  return {
    status = 200,
    body = {
      message = "Hello, world!"
    }
  }
end