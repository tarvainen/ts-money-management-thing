import { writeFileSync, readFileSync } from 'fs'

const dataFilePath = __dirname + '/../../data.json'

class Store {
  constructor(private data: any) {}

  set(key: string, item: any): void {
    this.data[key] = this.unref(item)

    this.persist()
  }

  get(key: string): any {
    return this.data[key]
  }

  private unref(item: any): any {
    return JSON.parse(JSON.stringify(item))
  }

  private persist(): void {
    writeFileSync(
      __dirname + '/../../data.json',
      JSON.stringify(this.data, null, 2)
    )
  }
}

const jsonContent = readFileSync(dataFilePath)
const data = jsonContent ? JSON.parse(jsonContent.toString()) : {}

const store = new Store(data)

export default store
