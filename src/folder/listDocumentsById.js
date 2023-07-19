'use strict'
import fs from 'fs'
import Api from '../common/Api'
import utils from '../common/utils'

const listDocumentsById = async ({ token, sandbox }, { folderId }) => {
  try {
    const filename = `${__dirname}/../resources/folders/listDocumentsById.graphql`
    const operations = fs.readFileSync(filename)
      .toString()
      .replace(/[\n\r]/gi, '')
      .replace('$folderId', folderId)
      .replace('$sandbox', sandbox.toString())

    const formData = (utils.query(operations))
    const response = await Api(token).post('/graphql', formData, {
      processData: false,
      withCredentials: true,
      cache: false,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response && response.data
  } catch (error) {
    console.error(error)
  }  
}

export {
  listDocumentsById
}