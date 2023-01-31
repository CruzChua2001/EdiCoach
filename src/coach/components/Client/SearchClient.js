import React, { useState } from "react"
import styled from "styled-components"
import { Form, Button } from "react-bootstrap"
import { Search } from "react-bootstrap-icons"
import { useAllClient } from "../Context";
const axios = require('axios');

const Hr = styled.hr`
    margin-inline: 6%;
    margin-top: 1.5%;
`

const Searchbar = styled.div`
    margin-top: 2%;
`

const SearchClient = () => {
    const [search, setSearch] = useState("")
    const allClient = useAllClient()

    const getSearchClient = () => {
        let url = "https://4142e664e1.execute-api.ap-southeast-1.amazonaws.com/dev/gettype/Client"
        if(search != ""){
            url = 'https://v0wz6u3kc1.execute-api.ap-southeast-1.amazonaws.com/prod/search?q=' + search + "*" + "&fq=usertype:'Client'"
        }

        axios.get(url).then(res => {
            let result = []
            if(search != ""){
                const hit = res['data']['hits']['found']
                if(hit > 0) {
                    result = formatCloudSearchData(res['data']['hits']['hit'])
                }
            }
            else {
                result = formatClientData(res['data'])
            }

            allClient.setClientResult(result)
        });
    }

    const formatCloudSearchData = (result) => {
        let arr = []

        result.forEach(item => {
            let obj = item['fields']
            obj['email'] = item['id']
            arr.push(obj)
        })

        return arr
    }

    const formatClientData = (result) => {
        let arr = []
        result.forEach(item => {
            let obj = {}
            obj['dob'] = item['dob']['S']
            obj['firstname'] = item['firstname']['S']
            obj['gender'] = item['gender']['S']
            obj['lastname'] = item['lastname']['S']
            obj['phone'] = item['phone']['S']
            obj['userid'] = item['userid']['S']
            arr.push(obj)
        })
        return arr
    }

    const enterSearchClient = (e) => {
        if(e.key == "Enter") {
            getSearchClient()
        }
    }

    return (
        <>
            <h2 className="mt-4 text-center primary-font-color">Search Clients</h2>

            <Hr />

            <div className="container">
                <Searchbar className="row">
                    <div className="col-10 col-sm-11 col-lg-11">
                        <Form.Control
                            type="text"
                            placeholder="Search client's name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyUp={enterSearchClient}
                        /> 
                    </div>
                    <div className="col-2 col-sm-1 col-lg-1">
                        <Button variant='primary' onClick={getSearchClient}>
                            <Search />
                        </Button>
                    </div>
                </Searchbar>
            </div>
        </>
    )
}

export default SearchClient