import React, { Fragment, useState } from 'react';
import { useQuery } from "@apollo/react-hooks"
import { getSpellingsQuery, getConsonantsQuery, getVowelsQuery } from '../queries/queries'
import SpellingList from './SpellingList'
import ConsonantChart from './ConsonantChart'
import VowelChart from './VowelChart'
import { Label, Segment } from 'semantic-ui-react'
import { useUser } from './App'

function Spellings () {

    const { loading, error, data } = useQuery(getSpellingsQuery);
    const { loading: loadingConsonants, error: errorConsonants, data: dataConsonants } = useQuery(getConsonantsQuery);
    const { loading: loadingVowels, error: errorVowels, data: dataVowels } = useQuery(getVowelsQuery);
    
    const [user] = useUser();
    console.log('user for Spellings is ', user )

    if (loading) return 'Loading List...';
    if (loadingConsonants) return 'Loading Consonants...';
    if (loadingVowels) return 'Loading Vowels ...';

    if (error) return `Error! ${error.message}`;
    if (errorConsonants) return `Error! ${error.message}`;
    if (errorVowels) return `Error! ${error.message}`;

    return (
        <React.Fragment> 
            <Segment raised>
                <Label as='a' color='black' ribbon>
                List
                </Label>
                <span>List of Symbols</span> 
            </Segment> 
            <SpellingList spellingsData={data.spellings_Q} /> 
            <Segment raised>
                <Label as='a' color='black' ribbon>
                Inventory
                </Label>
                <span>Consonant Inventory</span> 
            </Segment> 
            <ConsonantChart consonantsData={dataConsonants.consonants_Q} />
            <Segment raised>
                <Label as='a' color='black' ribbon>
                Inventory
                </Label>
                <span>Vowel Inventory</span> 
            </Segment>  
            <VowelChart vowelsData={dataVowels.vowels_Q} />    
        </React.Fragment>
    )
}


export default Spellings