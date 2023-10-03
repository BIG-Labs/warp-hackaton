use std::collections::HashMap;

use astroport::{asset::AssetInfo, pair::PoolResponse};
use cosmwasm_std::{Decimal, Deps, Order, StdResult, Uint128};

use crate::{
    definitons::UserPosition,
    state::{CONFIG, POSITIONS},
};

pub fn astroport_price(deps: Deps) -> StdResult<Decimal> {
    let config = CONFIG.load(deps.storage)?;

    let mut map_amounts: HashMap<String, Uint128> = HashMap::new();

    let result: PoolResponse = deps.querier.query_wasm_smart(
        config.astroport_pool_contract,
        &astroport::pair::QueryMsg::Pool {},
    )?;

    for asset in result.assets {
        if let AssetInfo::NativeToken { denom } = asset.info {
            map_amounts.insert(denom, asset.amount);
        }
    }

    return Ok(Decimal::from_ratio(
        map_amounts.get(&config.base_denom).unwrap().clone(),
        map_amounts.get(&config.quote_denom).unwrap().clone(),
    ));
}

pub fn qy_positions(
    deps: Deps,
    user: String,
    start_after: Option<u64>,
    limit: Option<u32>,
) -> StdResult<Vec<UserPosition>> {
    let a = rhaki_cw_plus::storage::multi_index::get_multi_index_values(
        deps.storage,
        user,
        POSITIONS().idx.owner,
        Order::Ascending,
        start_after,
        limit,
    )?;
}
